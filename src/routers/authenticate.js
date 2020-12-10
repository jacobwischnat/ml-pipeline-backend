const express = require('express');

const authenticate = require('../controllers/authenticate');

module.exports = dependencies => {
    const router = express.Router();

    router.get('/swap/:accountId', authenticate.swap(dependencies));
    router.post('/login', authenticate.login(dependencies));

    return router;
}