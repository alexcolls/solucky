const mongoose = require('mongoose');
const Ticket = require('./model/ticket.model');
const io = require('socket.io')(5000)
mongoose
  .connect('mongodb://127.0.0.1:27017/tickets', { useNewUrlParser: true })
  .catch(e => {
      console.error('Connection error', e.message)
  });

io.on('connection', (socket) => {
    console.log('User connected!')
    Ticket.find().then(result => {
      socket.emit('output-messages', result)
    })
    console.log('a user connected');
    socket.emit('message', 'Hello world');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chatmessage', _ticket => {
        const ticket = new Ticket({ _ticket });
        ticket.save().then(() => {
            io.emit('ticket', _ticket)
        })


    })
});