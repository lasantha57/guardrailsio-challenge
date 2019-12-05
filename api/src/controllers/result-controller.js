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
            const results = await ResultService.getById(req.params.id);
            res.json(results);
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        const payload = req.body;

        try {
            const newResult = await ResultService.create({
                ...payload
            });
            res.json(newResult);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ResultController();
