const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize} = require('sequelize');

const config = require(require('../.sequelizerc').config);

const routers = require('./routers');
const constants = require('./constants');
const middleware = require('./middleware');

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || constants.DEFAULT_PORT;

const initialise = async () => {
    const dataSource = new Sequelize(config[env]);

    await dataSource.sync();
    console.log('Database Synchronised');

    const dependencies = {
        dataSource,
    };

    app.use(bodyParser.json());
    app.use((request, _, next) => {
        console.log(request.method, request.originalUrl);

        request.locals = request.locals || {};

        next();
    });

    app.use('/api/auth', routers.authenticate(dependencies));
    app.use('/api/user', routers.user(dependencies));

    app.use(middleware.response(dependencies));
    app.use(middleware.error(dependencies));

    app.listen(port, () => console.log(`Listening on ${port}`));
};

initialise();