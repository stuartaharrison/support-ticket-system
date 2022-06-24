const Ticket = require('../models/ticketModel');
const { buildPaginationResult, extractPageParams } = require('../helpers/paginationHelpers');
const { applyPatch } = require('fast-json-patch');

const ticketCustomPropsForQueryStr = {
    custom: {
        deadlineBetween: (query, input) => {
            let aDates = input.split('|');
            query.deadlineDate = { $gte: aDates[0], $lte: aDates[1] }
        }
        //after: 'deadlineDate',
        //before: 'deadlineDate',
        //between: 'deadlineDate',
        // submittedBy: (query, input) => {
        //     query.submittedBy = input === 'null' ? null : input;
        // },
        // claimedBy: (query, input) => {
        //     console.log('claimed by custom', { query, input });
        //     query.claimedBy = input === 'null' ? null : input;
        // }
    }
};

const countTickets = async (req, res) => {
    let totalTicketsPromise = Ticket.countDocuments();
    let totalOpenTicketsPromise = Ticket.where({ isCompleted: false }).countDocuments();
    let totalClosedTicketsPromise = Ticket.where({ isCompleted: true }).countDocuments();
    let totalUnclaimedTicketsPromise = Ticket.where({ isCompleted: false, claimedBy: null }).countDocuments();
    let totalUserTicketsPromise = Ticket.where({ claimedBy: req.user._id }).countDocuments();
    let totalUserOpenTicketsPromise = Ticket.where({ isCompleted: false, claimedBy: req.user._id }).countDocuments();
    let totalUserClosedTicketsPromise = Ticket.where({ isCompleted: true, claimedBy: req.user._id }).countDocuments();

    let promiseResult = await Promise.all([ 
        totalTicketsPromise,
        totalOpenTicketsPromise,
        totalClosedTicketsPromise,
        totalUnclaimedTicketsPromise,
        totalUserTicketsPromise,
        totalUserOpenTicketsPromise,
        totalUserClosedTicketsPromise
    ]);

    res.status(200).json({
        totalTickets: promiseResult[0],
        totalTicketsOpen: promiseResult[1],
        totalTicketsClosed: promiseResult[2],
        totalUnclaimed: promiseResult[3],
        totalUserTickets: promiseResult[4],
        totalUserOpenTickets: promiseResult[5],
        totalUserClosedTickets: promiseResult[6]
    });
};

const createTicket = async (req, res) => {
    const ticket = await Ticket.create(req.body);
    res.status(200).json(ticket);
};

const fetchTickets = async (req, res) => {
    // extract the pagination params from the query string
    const { page, limit, sort, where } = extractPageParams(req, ticketCustomPropsForQueryStr);

    // count the total number of tickets based on the where condition
    const totalTickets = await Ticket.where(where).countDocuments();

    // get the paged list of tickets
    const tickets = await Ticket.find(where)
        .populate('office')
        .populate('submittedBy')
        .populate('claimedBy')
        .limit(limit)
        .skip(limit * (page - 1))
        .sort(sort);
    
    // build the pagination result and return the list
    var pagination = buildPaginationResult(tickets, page, limit, totalTickets);
    res.status(200).json(pagination);
};

const getTicket = async (req, res) => {
    const { id } = req.params; 
    if (!id) {
        res.status(404).json({ message: 'TicketId cannot be found.' });
        return;
    }

    const ticket = await Ticket.findById(id)
        .populate('office')
        .populate('submittedBy')
        .populate('claimedBy');
        
    if (!ticket) {
        res.status(404).json({ message: `Ticket with ID: ${id} could not be found.` });
        return;
    }

    res.status(200).json(ticket);
};

const updateTicket = async (req, res) => {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404).json({ message: `Ticket not found with Id: ${req.params.id}` });
        return;
    }

    ticket = applyPatch(ticket, req.body).newDocument;
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, ticket, {
        new: true
    });

    res.status(200).json(updatedTicket);
};

module.exports = {
    countTickets,
    createTicket,
    fetchTickets,
    getTicket,
    updateTicket
};