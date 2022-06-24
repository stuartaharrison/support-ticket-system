const passport = require('passport');

const authenticateAsync = async (req, res, next) => {
    passport.authenticate('local', (err, user, options) => {
        if (err) {
            res.status(401).json({
                message: err || "An error has occured."
            });
        }
        else if (!user) {
            res.status(401).json(options);
        }
        else {
            req.logIn(user, (err) => {
                if (err) {
                    res.status(500).json({
                        message: 'An error has occured.'
                    });
                }
                else {
                    req.session.user = JSON.stringify(user);
                    req.session.save((err) => {
                        if (err) {
                            res.status(500).json({
                                message: 'An error has occured.'
                            });
                        }
                        else {
                            res.status(200).json({
                                message: 'Authentication Successful'
                            });
                        }
                    });
                }
            });
        }
    })(req, res, next);
};

const getSessionAsync = async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            session: req.user
        });
    }
    else {
        res.status(401).json({
            session: null
        });
    }
};

const logoutSessionAsync = async (req, res) => {
    req.logOut(() => {});
    res.status(200).json({
        message: 'Logout Success'
    });
};

module.exports = {
    authenticateAsync,
    getSessionAsync,
    logoutSessionAsync
};