
const Result = require('../models/result-model');
const { AppError } = require('../utils/error-handler');

class ResultService {
    constructor() {
    }

    async getAll() {
        try {
            return await Result.find({});
        } catch (error) {
            throw new AppError(500, `Unable to fetch records - ${error}`)
        }
    }

    async getById(id) {
        try {
            return await Result.findById(id);
        } catch (error) {
            throw new AppError(500, `Unable to fetch record - ${error}`)
        }
    }

    async create(result) {
        try {
            const newResult = await Result.create(result);
            return newResult;
        } catch (error) {
            throw new AppError(500, `Unable to create record - ${error}`)
        }
    }
}

module.exports = new ResultService();
