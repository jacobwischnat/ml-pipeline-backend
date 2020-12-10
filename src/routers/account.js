const path = require('path');
const multer = require('multer');
const express = require('express');

const constants = require('../constants');
const account = require('../controllers/account');

const upload = multer({dest: path.join(constants.BASE_DIR, './files/')});

module.exports = dependencies => {
    const router = express.Router();

    router.post('/create', upload.single('icon'), account.create(dependencies));

    return router;
}