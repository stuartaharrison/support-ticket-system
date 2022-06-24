const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../helpers/authenticationHelpers');
const { 
    createOffice,
    fetchOffices,
    getOffice,
    updateOffice
} = require('../controllers/officeController');

router.route('/')
    .get(checkAuthenticated, fetchOffices)
    .post(checkAuthenticated, createOffice);

router.route('/:id')
    .get(checkAuthenticated, getOffice)
    .patch(checkAuthenticated, updateOffice);

module.exports = router;