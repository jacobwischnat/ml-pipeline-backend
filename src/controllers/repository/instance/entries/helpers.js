const lodash = require('lodash');

const repositoryModel = require('../../../../models/repository');
const repositoryTemplate = require('../../../../models/repositoryTemplate');
const repositoryInstanceModel = require('../../../../models/repositoryInstance');
const repositoryConfigurationModel = require('../../../../models/repositoryConfiguration');

module.exports.getConfiguration = async ({id, accountId, dataSource}) => {
    const Repository = repositoryModel.getModel(dataSource);
    const RepositoryTemplate = repositoryTemplate.getModel(dataSource);
    const RepositoryInstance = repositoryInstanceModel.getModel(dataSource);
    const RepositoryConfiguration = repositoryConfigurationModel.getModel(dataSource);

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

    const configuration = instance.configuration.reduce((configs, config) => {
        lodash.set(configs, config.template.name, config.value);

        return configs;
    }, {});

    return configuration;
}