const boom = require('boom');

const repositoryModel = require('../../../models/repository');
const repositoryInstanceModel = require('../../../models/repositoryInstance');

module.exports = ({dataSource}) => {
    const Repository = repositoryModel.getModel(dataSource);
    const RepositoryInstance = repositoryInstanceModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {accountId} = request.locals.user;
            const instances = await RepositoryInstance.findAll({
                where: {accountId},
                include: [
                    {
                        model: Repository,
                        as: 'repository'
                    }
                ]
            });

            response.locals.response = {instances};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}