const mongoose = require('mongoose');
const ticketModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User'
    },
    submittedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    deadlineDate: {
        type: Date,
        required: false,
        default: null
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    office: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Office'
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User'
    },
    claimedOnDate: {
        type: Date,
        required: false,
        default: null
    }
});

module.exports = mongoose.model('Ticket', ticketModel);