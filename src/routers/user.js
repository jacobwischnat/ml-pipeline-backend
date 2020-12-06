const express = require('express');

const user = require('../controllers/user');

module.exports = dependencies => {
    const router = express.Router();

    router.post('/create', user.create(dependencies));
    router.post('/invite/create', user.invite.create(dependencies));
    router.post('/invite/activate', user.invite.activate(dependencies));

    return router;
}