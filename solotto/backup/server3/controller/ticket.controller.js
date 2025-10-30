'use strict';

const Ticket = require('../model/ticket.model');


const postTicket = (req, res) => {
  
  const body = req.body

  if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a Ticket object',
      })
  }

  const ticket = new Ticket(body)

  if (!ticket) {
    return res.status(400).json({ success: false, error: err })
  }

  ticket.save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: ticket._id,
        message: 'New ticket added!',
      })
    })
    .catch(error => {
      return res.status(400).json({
          error,
          message: 'Ticket not added! Pls, try again.',
      })
    })
}

const getTickets = async (req, res) => {
  await Ticket.find({}, (err, tickets) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!tickets.length) {
      return res
        .status(404)
        .json({ success: false, error: `Ticket empty` })
    }
    return res.status(200).json(tickets)
  }).clone().catch(err => console.log(err))
}

module.exports = {
  postTicket,
  getTickets
}
