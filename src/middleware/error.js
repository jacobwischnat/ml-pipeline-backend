const constants = require('../constants');

module.exports = dependencies => (error, request, response, next) => {
    response.status((error.output && error.output.statusCode) || constants.HTTP_SERVER_ERROR);

    if (process.env.NODE_ENV='development' || process.env.RETURN_ERRORS) {
        console.error(error.toString());
        console.error(error.stack);
        console.error(error.message);
        response.json({
            ok: false,
            path: request.originalUrl,
            datetime: new Date().toLocaleString(),
            status: (error.output && error.output.statusCode) || constants.HTTP_SERVER_ERROR,
            response: {
                description: error.message ? error.message : error.toString(),
                stack: error.stack,
            }
        });
    } else response.end();
};
