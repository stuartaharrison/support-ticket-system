const bcrypt = require('bcrypt');
const env = require('./env');
const User = require('../models/userModel');

const seedAdminUserAsync = async () => {
    let foundAdmin = await User.findOne({ username: env.ADMIN_USERNAME });
    if (!foundAdmin) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD_PLAIN_TEXT, salt);
        await User.create({
            username: env.ADMIN_USERNAME,
            password: hashedPassword,
            userType: 'admin',
            defaultOffice: null,
            email: env.ADMIN_EMAIL,
            forenames: null,
            surname: null,
            isActive: true
        });
    }
};

module.exports = {
    seedAdminUserAsync
};