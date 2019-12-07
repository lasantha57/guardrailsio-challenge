const ResultService = require('../services/result-service');
const { AppError } = require('../utils/error-handler');
const ValidationHelper = require('../utils/validation');

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
                throw new AppError(404, 'missing required id');
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
                throw new AppError(404, 'missing required id');
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
                throw new AppError(404, 'missing required id');
            }
            const results = await ResultService.deleteById(id);
            res.json(results);
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {

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

}

module.exports = new ResultController();
