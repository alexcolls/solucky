'use strict';

const express = require("express");
const router = express.Router();
const eventController = require("./controllers/ticket.controller");

router.use(express.json());
router.get("/tickets", eventController.getTickets);
router.post("/tickets",eventController.postTicket)

module.exports = router;