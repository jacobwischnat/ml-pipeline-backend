module.exports = dependencies => (request, response) => {
    response.json({
        ok: true,
        datetime: new Date().toLocaleString(),
        status: response.statusCode,
        path: request.originalUrl,
        method: request.method,
        response: response.locals.response
    });
}