const path = require('path');
const colors = require('colors');
const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize} = require('sequelize');
const cookieParser = require('cookie-parser');

const config = require(require('../.sequelizerc').config);

const routers = require('./routers');
const constants = require('./constants');
const middleware = require('./middleware');

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || constants.DEFAULT_PORT;
const frontEndPath = path.resolve(__dirname, '../../frontend/dist');

console.log(frontEndPath);

const initialise = async ({log}) => {
    const {database} = config[env];
    const dataSource = new Sequelize(config[env]);

    await dataSource.sync();
    log(`Database ${database.bgWhite.black} Synchronised`);

    const dependencies = {
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

    app.use('/api/auth', routers.authenticate(dependencies));
    app.use('/api', middleware.authenticate(dependencies));

    app.use('/api/user', routers.user(dependencies));
    app.use('/api/file', routers.file(dependencies));

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