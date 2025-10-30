'use strict';

const ticketModel = require("../models/ticket.model");

const getTickets = async (req, res) => {
  res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  const eventData = await ticketModel.getAll();
  res.send(JSON.stringify(eventData));
};

const postTicket = async (req, res) => {
  const msg = req.body;
  console.log(msg)
  try{
    await ticketModel.set(msg);
    res.status(200)
  }catch(err){
    console.log(err)
    res.status(500)
  }
};

module.exports = { getTickets, postTicket };