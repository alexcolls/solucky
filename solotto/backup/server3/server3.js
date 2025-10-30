'use strict';


const TicketCtrl = require('./controller/ticket.controller');
const Ticket = require('./model/ticket.model');
const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');

const dates = ['2022-11-05', '2022-11-06']


const postTicket = async (req, res) => {

  try {
  
    const body = req.body

    //console.log(body, 'aaaa')

    if (!body) {
        return res.status(400).json({
          success: false,
          error: 'You must provide a Ticket object',
        })
    }

    const ticket = await Ticket.create({date: body.date, hour: body.hour, owner: body.owner, number: Number(body.number)})

    if (!ticket) {
      return res.status(400).json({ success: false, error: err })
    }

    await getTickets();
    console.log('ticket', ticket)
    io.emit('getNewTicket', ticket);
    res.status(201).json({
      success: true,
      id: ticket._id,
      message: 'New ticket added!',
    })
  } catch (error) {
      console.log(error, 'errorrrr')
      res.status(400).json({
        error,
        message: 'Ticket not added! Pls, try again.',
    })
  }
}

const axios = require('axios');
const data = JSON.stringify({
    "collection": "tickets",
    "database": "solucky",
    "dataSource": "solucky",
    "projection": {
        "_id": 1
    }
});
            
const config = {
    method: 'get',
    url: 'https://data.mongodb-api.com/app/data-gogby/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'eqE865bfFIChh7AI617nMi09aAosCRyMcMWJpYgNAtdNWPHRq7j6meukYQiXJIU5',
    },
    data: data
};
            
const getTickets = async (req, res) => {
  axios(config)
    .then(function (response) {
        io.emit('getTickets', JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

router.post('/api/tickets', postTicket);
router.get ('/api/tickets', getTickets);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(router);

const server = require('http').createServer(app);
const PORT = 5001;

app.get('/', (req, res) => {
  res.send('<h1>Welcome hackers to your next challenge! Hack me, get paid.</h1>');
});

const { Client } = require('pg');

const conString = "postgresql://solucky:dSb24bEYcIe0Eqi73klvDg@free-tier13.aws-eu-central-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dsolucky-4329" //Can be found in the Details page
const client = new Client(conString);

function createTable() {
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    const date = getDateSQL();
    const schema = 'INDEX id int, owner varchar(255), flag varchar(50), hour varchar(50), timestamp int'
    client.query(`CREATE TABLE ${date} ( ${schema} )`, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
      // >> output: 2018-08-23T14:02:57.117Z
      client.end();
    });
  });
}

function insertTicket() {
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    const date = getDateSQL();
    const schema = "22, 'jhkjadhkjahjksa', 'US', '03:21', 329303290923"
    client.query(`INSERT INTO ${date} ( ${schema} )`, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
      // >> output: 2018-08-23T14:02:57.117Z
      client.end();
    });
  });
}

createTable();
insertTicket();


// socket.io 
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

let countUsers = 0;

io.on('connection', (socket) => {

  countUsers++;
  console.log(`${countUsers} users connected`);
  io.emit('UserNumber', `user_num: ${countUsers}`);

  io.emit('getDate', getDate());

  setInterval( function() {
    const time = getTime();
    const timeSplit = time.split(':');
    if ( timeSplit[2] == 0 ) {
      io.emit('getTime', `server_time: ${time}`);
      if ( timeSplit[0] == 0 && timeSplit[1] == 1 ) {
        io.emit('getDate', getDate());
      }
    }
    io.emit('getCountDown', countDown());
  }, 1000);

  setInterval( async function () {
    try {
      const masterPubKey = new web3.PublicKey('GANTRxDjP5BoUExWqVLAC9yVhC29dThviuqNmMDdSEF4');
      const connection = new web3.Connection('https://api.devnet.solana.com', 'processed');
      const potSOL = Math.floor(await connection.getBalance(masterPubKey)/1000000000);
      coinTicker('bitstamp', 'SOL_USD').then( (price) => { 
        const potUSD = Math.floor(potSOL*price.last)
        io.emit('getPOT', { potSOL, potUSD });
      });
    } catch (error) {
      console.log(error)
    }
  }, 3000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    countUsers--;
    console.log(`${countUsers} users connected`);
    io.emit('UserNumber', `user_num: ${countUsers}`)

  });
  
  socket.on('newTicket', (ticket) => {
    console.log('ticket: ' + ticket);

    router.post('/tickets', TicketCtrl.postTicket);
    router.get('/tickets', TicketCtrl.getTickets);
    io.emit('getTickets', )
  });

});


// run server
server.listen(PORT, ()=> {
  console.log('listening on port', PORT);

  setInterval( function() {
    const time = getTime();
    if ( time.split(':')[2] == 0 )
      console.log(time);
  }, 1000);

})


// functions

const web3 =  require('@solana/web3.js');
const coinTicker = require('coin-ticker');

async function getMasterBalance() {
  
}

function createAccount(username, password) {
  return new Promise((resolve, reject) => {
    socket.emit('create account', {username:username, password:password});

    socket.once('create account return', (data) => resolve(data.failed));
  });
};


const formatTime = (num) => {
  if (String(num).length < 2) 
    return '0' + String(num);
  else if (String(num).length < 1) 
    return '00';
  return String(num);
}

const getTime = () => {
  const date = new Date
  const hours = formatTime(date.getUTCHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

const getDate = () => {
  const date = new Date
  const year = formatTime(date.getUTCFullYear());
  const month = formatTime(date.getUTCMonth());
  const day = formatTime(date.getUTCDate());
  return `${year}-${month}-${day}`;
}

const getDateSQL = () => {
  const date = new Date
  const year = formatTime(date.getUTCFullYear());
  const month = formatTime(date.getUTCMonth());
  const day = formatTime(date.getUTCDate());
  return `_${year}_${month}_${day}_`;
}

const countDown = () => {
  const time = getTime().split(':');
  const hours = formatTime(23-time[0]);
  const minutes = formatTime(59-time[1]);
  const seconds = formatTime(59-time[2]);
  return `${hours}h ${minutes}m ${seconds}s`;
}

const potTime = (time) => {

}


// Controllers




