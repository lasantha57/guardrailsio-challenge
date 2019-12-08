
const mongoose = require('mongoose');
const app = require('./src/app');

const { DB_URI } = require('./src/config/config');
const Logger = require('./src/utils/logger');

const port = process.env.PORT || 4000;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const startApp = () => {
    app.listen(port, () => console.log(`Api listening on port ${port}!`));
}

startApp();

process.on('uncaughtException', (err) => {
    Logger.log(err);
    process.exit(1);
});

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
    process.exit(1);
});
