const express = require('express');

const constants = require('../constants');
const repository = require('../controllers/repository');

const template = require('../controllers/repository/template');
const configuration = require('../controllers/repository/configuration');

module.exports = dependencies => {
    const router = express.Router();

    router.get('/', repository.get(dependencies));
    router.get('/instance', repository.instance.all(dependencies));
    router.post('/instance/entries/list/:id', repository.instance.entries.list(dependencies));
    router.post('/instance/entries/create/:id', repository.instance.entries.create(dependencies));
    router.get('/instance/:id', repository.instance.get(dependencies));
    router.put('/instance', repository.instance.put(dependencies));
    router.post('/configuration', configuration.create(dependencies));
    router.get('/template/:repositoryId', template.get(dependencies));

    return router;
}