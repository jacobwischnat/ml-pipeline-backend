const express = require('express');

const user = require('../controllers/user');

module.exports = dependencies => {
    const router = express.Router();

    router.get('/me', user.me(dependencies));
    router.get('/all', user.get(dependencies));
    router.post('/create', user.create(dependencies));
    router.post('/invite/create', user.invite.create(dependencies));
    router.post('/invite/accept', user.invite.accept(dependencies));

    return router;
}