'use strict';

const express = require('express');
const router = express.Router();
const TicketCtrl = require('../controller/ticket.controller');

// router.post('/tickets', TicketCtrl.postTicket);
router.get('/tickets', TicketCtrl.getTickets);

module.exports = router;