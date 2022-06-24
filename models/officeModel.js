const mongoose = require('mongoose');
const officeModel = mongoose.Schema({
    officeName: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model('Office', officeModel);