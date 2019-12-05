const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    status: { type: String, default: 'queued' },
    repositoryName: { type: String },
    findings: { type: JSON },
    queuedAt: { type: Date, default: Date.now },
    scanningAt: { type: Date, default: Date.now },
    finishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
