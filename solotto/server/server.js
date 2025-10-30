'use strict';
require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const coinTicker = require('coin-ticker');
const utils = require('./src/utils');
const ctrls = require('./src/controller');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

// Connect to PotsgreSQL
const { Client } = require('pg');
const postgreURL = process.env.POSTGRE_URL;
const client = new Client(postgreURL);

client.connect(function(err) {
  if(err) {
    return console.error('Could not connect to DB...', err);
  } else {
    console.log('DB connected successfully!\n');
  }
});

const server = require('http').createServer(app);
const PORT = 5001;
let history = [];
// run server
server.listen(PORT, ()=> {
  console.log('listening on port', PORT);
  setInterval( async function() {
    const time =  utils.getTime();
    const arr = time.split(':');
    if ( arr[2] == 0 ) {
      console.log(time);
      if ( arr[1] == 0 && arr[0] == 8 ) {
        const date = utils.getDateSQL();
        ctrls.createTable(client, date);
        console.log(date);
        history = await ctrls.getHistory(client);
        io.emit('getHistory', history);
      }
    }
  }, 1000);
});

// socket.io 
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

let countUsers = 0;

io.on('connection', async (socket) => {

  countUsers++;
  console.log(`${countUsers} users connected`);
  io.emit('userNumber', `user_num: ${countUsers}`);

  io.emit('getHistory', await ctrls.getHistory(client)); 
  // try {
  //   const players = await ctrls.getTickets( client ) || [];
  //   io.emit('totalPlayers', await players.length );
  //   io.emit('totalCountries', utils.totalCountries(players));
  // } catch (e) {
  //   //console.log(e);
  // }
  
  const tickets = await ctrls.getTickets( client, utils.getDateSQL() )
  let potSOL = 0;
  try {
    potSOL = await tickets.length;
  } catch (e) {
    console.log('tickets.length error: ' + e.message);
  };
  coinTicker('bitstamp', 'SOL_USD').then( (price) => { 
    const potUSD = Math.floor(potSOL*price.last)
    io.emit('getPOT', { potSOL, potUSD });
  });
  io.emit('nVerified', utils.nVerified(tickets))
  io.emit('nPlayers', utils.nPlayers(tickets))
  io.emit('getTickets', tickets);

  socket.on('newTicket', async (ticket) => {
    ticket = `'${utils.getTime()}' ${ticket}`;
    // console.log(ticket);
    const date = utils.getDateSQL();
    io.emit('postTicket', ctrls.postTicket( client, date, ticket ));
    const tickets = await ctrls.getTickets( client, utils.getDateSQL() )
    const potSOL = await tickets.length;
    coinTicker('bitstamp', 'SOL_USD').then( (price) => { 
      const potUSD = Math.floor(potSOL*price.last)
      io.emit('getPOT', { potSOL, potUSD });
    });
    io.emit('nVerified', utils.nVerified(tickets))
    io.emit('nPlayers', utils.nPlayers(tickets))
    io.emit('nNumbers', utils.nPlayers(tickets))
    io.emit('getTickets', tickets);
  })

  socket.on('newPlayer', async (player) => {
    console.log('newPlayer:', player)
    const post = ctrls.postPlayer( client, player ) 
    // io.emit('postTicket', ctrls.postPlayer( client, player ));
    if ( post ) {
      const players = await ctrls.getTickets( client ) || [];
      io.emit('totalPlayers', await players.length );
      io.emit('totalCountries', utils.totalCountries(players));
    }

  });

  socket.on('disconnect', () => {
    countUsers--;
    console.log(`${countUsers} users connected`);
    io.emit('UserNumber', `user_num: ${countUsers}`)
  });

});
