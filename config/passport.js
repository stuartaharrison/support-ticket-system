const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const { buildUserViewModel } = require("../helpers/userHelpers");

passport.use(new LocalStrategy({ 
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, 
async (req, username, password, done) => {
    let user = await User.findOne({ username: username });
    if (!user) {
        return done(null, false, { message: 'Invalid username/password.' });
    }

    let authResult = await bcrypt.compare(password, user.password);
    if (authResult) {
        let viewModel = buildUserViewModel(user);
        done(null, viewModel);
    }
    else {
        done(null, false, { message: 'Invalid username/password.' });
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    var user = await User.findById(userId).populate('defaultOffice');
    if (!user) {
        return done(null, false, { message: 'Invalid Session.' });
    }

    let viewModel = buildUserViewModel(user);
    return done(null, viewModel);
});

module.exports = passport;