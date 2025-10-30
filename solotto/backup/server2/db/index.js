'use strict';
require('dotenv').config();

const express = require("express")
const app = new express()

const cors = require('cors')
const router = require("./router");

app.use(cors());
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});