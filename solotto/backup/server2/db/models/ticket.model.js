'use strict';

require('dotenv').config();
const client = require('./index');

const tickets = client.db(process.env.DATABASE_NAME).collection('tickets');

exports.getAll = () => tickets.find({}).toArray();

exports.set = (msg) => tickets.insertOne({
  date: msg.date,
  hour: msg.hour,
  wallet: msg.wallet,
  number: msg.number,
  verified: msg.verified,
  country: msg.country,
  flag: msg.flag,
  twitter: msg.twitter
});