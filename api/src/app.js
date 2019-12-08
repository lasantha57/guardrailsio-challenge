const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const { handleError } = require('./utils/error-handler');

const ResultRouter = require('./routes/result-route');

const app = express();

app.use(helmet());

app.use(cors());

app.use(bodyParser.json({ limit: '1mb' }));

app.use('/results', ResultRouter);

app.get('/', (req, res) => res.status(200).end());

app.get('*', (req, res) => res.status(404).send('Not Found!!'));

app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;
