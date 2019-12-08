const ResultService = require('../services/result-service');
const { AppError } = require('../utils/error-handler');
const ValidationHelper = require('../utils/validation');
const { body, validationResult } = require('express-validator');

class ResultController {
    constructor() {
    }

    async getAll(req, res, next) {
        try {
            const results = await ResultService.getAll();
            res.json(results);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async getById(req, res, next) {
        const id = req.params.id;

        try {
            if (ValidationHelper.isNotNullOrEmpty(id)) {
                throw new AppError(400, 'missing required url parameter id');
            }
            const results = await ResultService.getById(id);
            res.json(results);
        } catch (error) {
            next(error)
        }
    }

    async getFindingsById(req, res, next) {
        const id = req.params.id;

        try {
            if (ValidationHelper.isNotNullOrEmpty(id)) {
                throw new AppError(400, 'missing required url parameter id');
            }
            const results = await ResultService.getFindingsById(id);
            res.json(results);
        } catch (error) {
            next(error)
        }
    }

    async deleteById(req, res, next) {
        const id = req.params.id;

        try {
            if (ValidationHelper.isNotNullOrEmpty(id)) {
                throw new AppError(400, 'missing required url parameter id');
            }
            const results = await ResultService.deleteById(id);
            res.json(results);
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const { statusId, repositoryName, findings, queuedAt, scanningAt, finishedAt } = req.body;

        try {
            const newResult = await ResultService.create({
                statusId,
                repositoryName,
                findings,
                queuedAt,
                scanningAt,
                finishedAt
            });
            res.json(newResult);
        } catch (error) {
            next(error)
        }
    }

    validate(method) {
        switch (method) {
            case 'create': {
                return [
                    body('statusId', 'missing required statusId').exists(),
                    body('repositoryName', 'missing required repositoryName').exists(),
                    body('queuedAt', 'missing required queuedAt').exists(),
                    body('scanningAt', 'missing required scanningAt').exists(),
                    body('scanningAt', 'missing required finishedAt').exists()
                ]
            }
        }
    }

}

module.exports = new ResultController();
