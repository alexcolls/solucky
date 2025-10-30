
const io = require('socket.io')
const client = io.listen(4000).sockets;

const mongo = require('mongodb').MongoClient;
//const Ticket = require('./model/ticket.model');

mongo.connect('mongodb://127.0.0.1:27017/tickets', function(err, db) {

  if(err){
    throw err;
  }


  client.on('connection', function() {
    let tickets = db.collection('tickets') 

    sendStatus = function(s){
      socket.emit('status', s);
    };

    tickets.find().toArray( function(err, res) {
      if(err){
        throw err;
      }
      socket.emit('output', res);
    });

    socket.on('input', function(data){
      // let date = data.date;
      // let time = data.time;
      // let number = data.number;
      // let owner = data.owner;
      // let verified = data.verified;
      // let country = data.country;
      // let flag = data.flag;
      // let twitter = data.twitter;
      tickets.insert(data, function(){
        client.emit('output', [data]);
        sendStatus({
          ticket: 'Number commited!',
          clear: true
        });
      });

    });

  });

});