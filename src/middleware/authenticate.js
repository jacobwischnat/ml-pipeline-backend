const jwt = require('jsonwebtoken');
const boom = require('boom');
const constants = require('../constants');

const jwtVerify = (token, secret) => new Promise((resolve, reject) => jwt.verify(token, secret, (error, result) => {
    if (error) return reject(error);

    resolve(result);
}));

module.exports = dependencies => async (request, response, next) => {
    try {
        if (constants.DISABLE_AUTH_MIDDLEWARE.some(path => request.originalUrl.startsWith(path))) return next();

        let {authorization} = request.headers;
        let {token} = request.cookies;

        if (authorization) authorization = authorization.replace('Bearer ', '');

        const jwt = authorization || token;

        if (!jwt) throw boom.unauthorized('JWT Required');

        const result = await jwtVerify(jwt, process.env.JWTSECRET);

        request.locals.user = result;

        next();
    } catch (ex) {
        next(ex);
    }
};