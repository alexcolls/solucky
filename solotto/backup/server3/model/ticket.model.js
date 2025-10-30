'use strict';

const mongoose = require('./index')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  date: Number,
  hour: String,
  owner: String,
  number: Number,
  //verified: Boolean,
  //country: String,
  //flag: String,
  //city: String,
  //twitter: String,
  //discord: String
}, { timestamps: true },
);

module.exports =  mongoose.model('ticket', ticketSchema);
