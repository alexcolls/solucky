'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./model')
const router = require('./router/router')

const app = new express()
const apiPort = 6666

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', router)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

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
})