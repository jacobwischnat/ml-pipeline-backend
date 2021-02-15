require('colors');
const path = require('path');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize} = require('sequelize');
const cookieParser = require('cookie-parser');

const config = require(require('../.sequelizerc').config);

const routers = require('./routers');
const constants = require('./constants');
const middleware = require('./middleware');
const integrations = require('./integrations');

const app = express();
const multi = multer({storage: multer.memoryStorage()});
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || constants.DEFAULT_PORT;
const frontEndPath = path.resolve(__dirname, '../../frontend/dist');

const initialise = async ({log}) => {
    const haveAllRequiredEnvVars = constants.REQUIRED_ENV_VARS
        .every(envvar => Object.keys(process.env).some(evar => evar === envvar));
    if (!haveAllRequiredEnvVars) {
        const missingVars = constants.REQUIRED_ENV_VARS.filter(envvar => !Object.keys(process.env).some(evar => evar === envvar));
        return log(`Missing env vars: ${missingVars.join(', ')}`);
    }

    const {database} = config[env];
    const dataSource = new Sequelize(config[env]);

    await dataSource.sync();
    log(`Database ${database.bgWhite.black} Synchronised`);

    const dependencies = {
        integrations,
        dataSource,
    };

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use((request, response, next) => {
        log(request.method.bgBrightMagenta.black, request.originalUrl);

        request.locals = request.locals || {};
        response.locals = response.locals || {};

        next();
    });

    app.use('/api', middleware.authenticate(dependencies), multi.any());

    app.use('/api/user', routers.user(dependencies));
    app.use('/api/file', routers.file(dependencies));
    app.use('/api/auth', routers.authenticate(dependencies));
    app.use('/api/account', routers.account(dependencies));
    app.use('/api/repository', routers.repository(dependencies));

    app.use('/api', middleware.response(dependencies));
    app.use('/api', middleware.error(dependencies));

    app.get('/*', (request, response) => {
        if (request.originalUrl.includes('.')) {
            response.sendFile(path.join(frontEndPath, path.basename(request.originalUrl)));
        } else response.sendFile(path.join(frontEndPath, './index.html'));
    });

    app.listen(port, () => log(`Listening on ${port.toString().bgRed.white}`));
};

initialise({
    log: (...messages) => console.log(constants.LOG_TAG.bgGreen.white, ...messages)
});