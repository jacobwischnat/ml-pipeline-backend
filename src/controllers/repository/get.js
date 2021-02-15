const boom = require('boom');

const accountModel = require('../../models/account');
const repositoryModel = require('../../models/repository');

module.exports = ({dataSource}) => {
    const Repository = repositoryModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            // const {accountId} = request.locals.user;
            const repositories = await Repository.findAll({
                where: {}
            });

            response.locals.response = {repositories};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}