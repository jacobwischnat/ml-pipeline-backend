const express = require('express');

const authenticate = require('../controllers/authenticate');

module.exports = dependencies => {
    const router = express.Router();

    router.post('/login', authenticate.login(dependencies));

    return router;
}