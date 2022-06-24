const mongoose = require('mongoose');
const userModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['admin', 'technician', 'user'],
        default: 'user'
    },
    defaultOffice: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Office'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    forenames: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('User', userModel);