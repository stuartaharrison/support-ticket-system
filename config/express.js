const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const env = require('./env');
const passport = require('./passport');
const {
    authRoutes,
    officeRoutes,
    ticketRoutes,
    userRoutes
} = require('../routes');

const createExpressApp = () => {
    const app = express();

    // enable cors when in development
    if (process.env.NODE_ENV !== 'production') {
        app.use(cors());
    }
    
    // configure cookies & express session storage/store
    app.use(cookieParser());
    app.use(session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        })
    }));

    // configure passport for authentication and setup json body parser
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // configure the routes/api endpoints
    app.use('/api/authenticate', authRoutes);
    app.use('/api/offices', officeRoutes);
    app.use('/api/tickets', ticketRoutes);
    app.use('/api/users', userRoutes);

    // serve the front-end client application only when in production mode
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
        app.get('*', (req, res) =>
            res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
        );
    } else {
        app.get('/', (req, res) => res.send('Please set to production'));
    }

    return app;
};

module.exports = createExpressApp;