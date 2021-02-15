const repositoryInstanceModel = require('../../../models/repositoryInstance');
const repositoryConfigurationModel = require('../../../models/repositoryConfiguration');

module.exports = ({dataSource}) => {
    const RepoConfig = repositoryConfigurationModel.getModel(dataSource);
    const RepoInstance = repositoryInstanceModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {accountId} = request.locals.user;
            const {repositoryId, name, description, configuration} = request.body;

            const {id: configurationId} = await RepoInstance.create({
                name,
                accountId,
                description,
                repositoryId,
                updatedAt: Date.now(),
                createdAt: Date.now()
            });

            const configs = [];

            for (const {id, value} of configuration) {
                const conf = await RepoConfig.create({
                    value,
                    accountId,
                    repositoryId,
                    repositoryInstanceId: configurationId,
                    repositoryTemplateId: id,
                    updatedAt: Date.now(),
                    createdAt: Date.now()
                });

                configs.push(conf);
            }

            response.locals.response = {configurationId, confiugration: configs};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}