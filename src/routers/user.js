const express = require('express');

const user = require('../controllers/user');

module.exports = dependencies => {
    const router = express.Router();

    router.post('/create', user.create(dependencies));

    return router;
}