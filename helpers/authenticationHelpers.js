const standardErrorCode = 401;
const standardErrorMessage = 'You are not authorised to view this.';

const isPassportConfigured = (req) => {
    if (typeof(req.isAuthenticated) === 'function') {
        return true;
    }
    else {
        console.error('Cannot check Authentication Status. Is PassportJs configured?');
        return false;
    }
};

const checkAuthenticated = (req, res, next) => {
    if (!isPassportConfigured(req) || !req.isAuthenticated()) {
        res.status(standardErrorCode).json({
            message: standardErrorMessage
        });
    }
    else {
        return next();
    }
};

const checkNotAuthenticated = (req, res, next) => {
    if (!isPassportConfigured(req)) {
        res.status(standardErrorCode).json({
            message: standardErrorMessage
        });
    }
    else if (req.isAuthenticated()) {
        res.status(400).json({
            message: 'You are already authenticated.'
        });
    }
    else {
        return next();
    }
};

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    isPassportConfigured
};