const boom = require('boom');
const path = require('path');

const constants = require('../../constants');

const fileModel = require('../../models/file');
const userAccountModel = require('../../models/userAccount');

module.exports = {
    get: ({dataSource}) => {
        const File = fileModel.getModel(dataSource);
        const UserAccount = userAccountModel.getModel(dataSource);

        return async (request, response, next) => {
            try {
                const {userId} = request.locals.user;
                const {fileId} = request.params;

                const accounts = await UserAccount.findAll({where: {userId}, attributes: ['accountId']});
                const file = await File.findOne({where: {id: Number(fileId)}});

                if (!accounts.some(({accountId}) => accountId === file.owner)) throw boom.notFound('File not found');
                if (!file) throw boom.notFound('File not found');

                response.sendFile(path.join(constants.BASE_DIR, file.path));
            } catch (ex) {
                next(ex);
            }
        };
    }
}