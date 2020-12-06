const constants = require('../constants');

module.exports = dependencies => (error, request, response, next) => {
    response.status(constants.HTTP_SERVER_ERROR);

    if (process.env.NODE_ENV='development' || process.env.RETURN_ERRORS) {
        response.json({
            ok: false,
            datetime: new Date().toLocaleString(),
            status: constants.HTTP_SERVER_ERROR,
            path: request.originalUrl,
            error: {
                description: error.toString(),
                stack: error.stack,
            }
        });
    } else response.end();
};
