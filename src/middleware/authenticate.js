const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const jwtVerify = promisify(jwt.verify);

module.exports = dependencies => async (request, response) => {
    const {authorization} = request.headers;
    console.log({authorization});

    const result = await jwtVerify(authorization, process.env.JWTSECRET);
};