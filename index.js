const colors = require('colors');
const env = require('./config/env');
const connect = require('./config/db');
const createExpressApp = require('./config/express');
const { seedAdminUserAsync } = require('./config/seed');

const mongoose = connect();
const expressApp = createExpressApp();
const server = require('http').createServer(expressApp);

server.listen(env.PORT, async () => {
    await seedAdminUserAsync();
    console.log(`Express is running on port: ${env.PORT}`.cyan.underline);
    console.log(`Express is available at: http://localhost:${env.PORT}`.cyan.underline);
});