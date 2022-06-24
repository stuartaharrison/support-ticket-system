const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/authenticationHelpers');
const {
    authenticateAsync,
    getSessionAsync,
    logoutSessionAsync
} = require('../controllers/authController');

router.route('/')
    .delete(checkAuthenticated, logoutSessionAsync)
    .get(checkAuthenticated, getSessionAsync)
    .post(checkNotAuthenticated, authenticateAsync)

module.exports = router;