const {name} = require('../package.json');

module.exports.DEFAULT_JWT_EXPIRATION = 30 * 60 * 1000; // 30 Minutes.
module.exports.DEFAULT_PORT = 8080;
module.exports.HTTP_SERVER_ERROR = 500;
module.exports.LOG_TAG = name;
module.exports.DISABLE_AUTH_MIDDLEWARE = [
    '/api/user/invite/accept'
];