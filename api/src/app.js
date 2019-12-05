const express = require('express');
const bodyParser = require('body-parser');
const { handleError } = require('./utils/error-handler');

const ResultRouter = require('./routes/result-route');

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));

app.use('/results', ResultRouter);

app.get('/', (req, res) => res.status(200).end());

app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;
