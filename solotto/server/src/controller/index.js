'use strict';

const utils = require('../utils');
// const Ticket = require('../models/ticket.model');

async function createTable( client, date ) {
  const schema = '_hour varchar(21), __num__ int PRIMARY KEY, _verified boolean, _owner varchar(255), _flag varchar(11), _pot int,_timestamp bigint'
  const query = `CREATE TABLE ${date} ( ${schema} )`
  client.query(query, function(err, result) {
    if(err) {
      return console.log('error creating table query', err);
    }
    console.log(`NEW TABLE ${date} ${utils.getTime()}`);
    return result;
  });
}

async function postTicket( client, date, ticket ) {
  const schema = "_hour, __num__, _verified, _owner, _flag, _pot, _timestamp";
  const query = `INSERT INTO ${date} ( ${schema} ) VALUES ( ${ticket} )`;
  console.log('postTicket', client.query)
  client.query(query, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(`NEW TICKET ${ticket} ${utils.getTime()}`);
    return result;
  });
}

async function getTickets( client, date ) {
  const query = `SELECT * FROM ${date}`;
  try {
    const data = await client.query(query)
    const rows = await data.rows;
    //console.log('rows', rows);
    return rows
  } catch (error) {
    console.log(error);
  }
}

async function postHistory( client, lucky ) {
  const schema = '__date__, _time, _num, _verified, _account, _owner, _flag, _pot, _timestamp';
  const query = `INSERT INTO _$luckies$_ ( ${schema} ) VALUES ( ${lucky} )`;
  client.query(query, function(err, result) {
    if(err) {
      return 0;
    }
    console.log(`NEW LUCKY ${lucky}`);
    return result;
  });
}


async function getHistory( client ) {
  const query = `SELECT * FROM _$luckies$_`;
  try {
    const data = await client.query(query)
    const rows = await data.rows;
    return rows
  } catch (error) {
    console.log(error);
  }
}

async function postPlayer ( client, player ) {
  console.log('eoooooooooooo', player);
  const schema = '__wallet__, _flag, _country, _city, _ip, _timestamp';
  const query = `INSERT INTO _players_ ( ${schema} ) VALUES ( ${player} )`;
  client.query(query, function(err, result) {
    if(err) {
      console.log(`NEW PLAYER!!!! ERROR ${player}`, err);
      return 0;
    }
    console.log(`NEW PLAYER!!!!!!!!!!!!!!!!!!! ${player}`);
    return result;
  });
}

async function getPlayers( client ) {
  const query = `SELECT * FROM _players_`;
  try {
    const data = await client.query(query)
    const rows = await data.rows;
    return rows
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createTable,
  postTicket,
  getTickets,
  postHistory,
  getHistory,
  postPlayer,
  getPlayers
}
