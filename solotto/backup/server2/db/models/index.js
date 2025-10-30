'use strict';

require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DATABASE_URL);

async function connect () {
  try {
    await client.connect();
    console.log('Connected to the MongoDB');
  } catch (err) {
    console.log(err);
  }
};

connect();

module.exports = client;