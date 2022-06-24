const env = require('./env');
const mongoose = require('mongoose');

const connect = () => {
    try {
        return mongoose.connect(env.MONGO_URI);
        //console.log(`💻 MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connect;