if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT || 8080,
    SESSION_SECRET: process.env.SESSION_SECRET || 'hedgehogsLikeEarthworms',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/supporttickets',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@supportticket.com',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD_PLAIN_TEXT: process.env.ADMIN_PASSWORD_PLAIN_TEXT || 'admin'
};