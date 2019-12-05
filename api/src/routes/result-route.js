const express = require('express');
const router = express.Router();
const ResultController = require('../controllers/result-controller');

router.get('/', ResultController.getAll);

router.get('/:id', ResultController.getById);

router.post('/', ResultController.create);

module.exports = router;
