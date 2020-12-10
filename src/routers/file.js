const express = require('express');

const file = require('../controllers/file');

module.exports = dependencies => {
    const router = express.Router();

    router.get('/:fileId', file.get(dependencies));

    return router;
}