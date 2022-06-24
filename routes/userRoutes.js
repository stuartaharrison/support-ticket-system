const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../helpers/authenticationHelpers');
const { 
    createUser,
    fetchUsers,
    getUser,
    listUsers,
    updateUser
} = require('../controllers/usersController');

router.route('/')
    .get(checkAuthenticated, fetchUsers)
    .post(checkAuthenticated, createUser);

router.route('/list')
    .get(checkAuthenticated, listUsers);

router.route('/:id')
    .get(checkAuthenticated, getUser)
    .patch(checkAuthenticated, updateUser);

module.exports = router;