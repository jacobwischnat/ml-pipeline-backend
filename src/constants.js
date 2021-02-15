const path = require('path');
const {name} = require('../package.json');

module.exports.DEFAULT_JWT_EXPIRATION = 30 * 60 * 1000; // 30 Minutes.
module.exports.DEFAULT_PORT = 8080;
module.exports.HTTP_SERVER_ERROR = 500;
module.exports.LOG_TAG = name;
module.exports.DISABLE_AUTH_MIDDLEWARE = [
    '/api/auth/login',
    '/api/user/invite/accept'
];
module.exports.BASE_DIR = path.resolve(__dirname, '../');
module.exports.REQUIRED_ENV_VARS = ['JWTSECRET'];
module.exports.DEFAULT_PATH = '/';
module.exports.DEFAULT_PATH_GCPGCS = '/';
module.exports.DEFAULT_PATH_FTP = './';