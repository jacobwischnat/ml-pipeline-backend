const boom = require('boom');
const path = require('path');
const baseDir = path.resolve(__dirname, '../../../');

const fileModel = require('../../models/file');

module.exports = {
    get: ({dataSource}) => {
        const File = fileModel.getModel(dataSource);

        return async (request, response, next) => {
            try {
                const {fileId} = request.params;
                const {accountId} = request.locals.user;
                const file = await File.findOne({where: {id: Number(fileId), owner: accountId}});

                if (!file) throw boom.notFound('File not found');

                response.sendFile(path.join(baseDir, file.path));
            } catch (ex) {
                next(ex);
            }
        };
    }
}