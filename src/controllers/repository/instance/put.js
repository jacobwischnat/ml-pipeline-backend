const boom = require('boom');

const repositoryConfigurationModel = require('../../../models/repositoryConfiguration');
const repositoryInstanceModel = require('../../../models/repositoryInstance');

module.exports = ({dataSource}) => {
    const RepositoryConfiguration = repositoryConfigurationModel.getModel(dataSource);
    const RepositoryInstance = repositoryInstanceModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {id, name, configuration} = request.body;
            const {accountId} = request.locals.user;
            const instance = await RepositoryInstance.findOne({
                where: {accountId, id}
            });
            instance.name = name;

            await instance.save();

            for (const {id, value} of configuration) {
                const config = await RepositoryConfiguration.findOne({
                    where: {accountId, id}
                });
                config.value = value;

                await config.save();
            }

            response.locals.response = {instance};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}