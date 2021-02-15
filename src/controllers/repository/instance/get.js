const boom = require('boom');

const repositoryModel = require('../../../models/repository');
const repositoryTemplate = require('../../../models/repositoryTemplate');
const repositoryInstanceModel = require('../../../models/repositoryInstance');
const repositoryConfigurationModel = require('../../../models/repositoryConfiguration');

module.exports = ({dataSource}) => {
    const Repository = repositoryModel.getModel(dataSource);
    const RepositoryTemplate = repositoryTemplate.getModel(dataSource);
    const RepositoryInstance = repositoryInstanceModel.getModel(dataSource);
    const RepositoryConfiguration = repositoryConfigurationModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {id} = request.params;
            const {accountId} = request.locals.user;
            const instance = await RepositoryInstance.findOne({
                where: {accountId, id: Number(id)},
                include: [
                    {
                        model: Repository,
                        as: 'repository'
                    },
                    {
                        model: RepositoryConfiguration,
                        as: 'configuration',
                        include: [
                            {
                                model: RepositoryTemplate,
                                as: 'template'
                            },
                        ]
                    }
                ]
            });

            response.locals.response = {instance};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}