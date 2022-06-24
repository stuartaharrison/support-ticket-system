const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { buildPaginationResult, extractPageParams } = require('../helpers/paginationHelpers');
const { buildUserListView, buildUserViewModel } = require('../helpers/userHelpers');
const { applyPatch } = require('fast-json-patch');

const createUser = async (req, res) => {
    // extract the details out from body of the request
    const { password, ...rest } = req.body;

    // create the salt & hash the password from the body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert the user into the db with the hashed password value
    const user = await User.create({
        ...rest,
        password: hashedPassword
    });

    let viewModel = buildUserViewModel(user);
    res.status(200).json(viewModel);
};

const fetchUsers = async (req, res) => {
    // extract the pagination params from the query string
    const { page, limit, sort, where } = extractPageParams(req);

    // count the total number of users that match the where condition
    const totalUsers = await User.where(where).countDocuments();

    // get the paged list of users
    const users = await User.find(where)
        .populate('defaultOffice')
        .limit(limit)
        .skip(limit * (page - 1))
        .sort(sort);

    // build the pagination result and return the list
    var viewModels = users.map((u) => buildUserViewModel(u));
    var pagination = buildPaginationResult(viewModels, page, limit, totalUsers);
    res.status(200).json(pagination);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: 'UserId cannot be found.' });
        return;
    }

    const user = await User.findById(id).populate('defaultOffice');
    if (!user) {
        res.status(404).json({ message: `User with ID: ${id} could not be found.` });
        return;
    }

    var viewModel = buildUserViewModel(user);
    res.status(200).json(viewModel);
};

const listUsers = async (req, res) => {
    const users = await User.find({
        isActive: true
    })
    .populate('defaultOffice')
    .sort({ username: 1 });

    const listMap = users.map((u) => buildUserListView(u));
    res.status(200).json(listMap);
};

const updateUser = async (req, res) => {
    // extract the request details
    const { id } = req.params.id;
    const { newPassword, operations } = req.body;

    // locate the user within our db that we are going to patch/update
    let user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: `User with ID: ${req.params.id} could not be found.` });
        return;
    }

    // apply the patch to update the base details
    user = applyPatch(user, operations).newDocument;

    // check & update a new password field
    if (newPassword && newPassword.length > 0) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user = { ...user, password: hashedPassword };
    }

    // call our db to update
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
        new: true
    });

    var viewModel = buildUserViewModel(updateUser);
    res.status(200).json(viewModel);
};

module.exports = {
    createUser,
    fetchUsers,
    getUser,
    listUsers,
    updateUser
};