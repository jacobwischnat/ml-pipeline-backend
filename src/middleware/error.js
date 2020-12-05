const constants = require('../constants');

module.exports = dependencies => (error, request, response) => {
    if (error) {
        response.status(constants.HTTP_SERVER_ERROR);

        if (process.env.NODE_ENV=dev || process.env.RETURN_ERRORS) {
            response.json({
                ok: false,
                status: constants.HTTP_SERVER_ERROR,
                path: request.originalUrl,
                error: {
                    description: ex.toString(),
                    stack: ex.stack,
                }
            });
        } else response.end();
    }
};
