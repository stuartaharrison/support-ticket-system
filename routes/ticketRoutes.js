const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../helpers/authenticationHelpers');
const { 
    countTickets,
    createTicket,
    fetchTickets,
    getTicket,
    updateTicket
} = require('../controllers/ticketsController');

router.route('/')
    .get(checkAuthenticated, fetchTickets)
    .post(checkAuthenticated, createTicket);

router.route('/count')
    .get(checkAuthenticated, countTickets);

router.route('/:id')
    .get(checkAuthenticated, getTicket)
    .patch(checkAuthenticated, updateTicket);

module.exports = router;