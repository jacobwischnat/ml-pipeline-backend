const helpers = require('./helpers');

const repositoryModel = require('../../../../models/repository');
const repositoryTemplate = require('../../../../models/repositoryTemplate');
const repositoryInstanceModel = require('../../../../models/repositoryInstance');
const repositoryConfigurationModel = require('../../../../models/repositoryConfiguration');

module.exports = ({dataSource, integrations}) => {
    const Repository = repositoryModel.getModel(dataSource);
    const RepositoryTemplate = repositoryTemplate.getModel(dataSource);
    const RepositoryInstance = repositoryInstanceModel.getModel(dataSource);
    const RepositoryConfiguration = repositoryConfigurationModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {id} = request.params;
            const {path} = request.body;
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

            const configuration = await helpers.getConfiguration({id, accountId, dataSource});

            let items = [];
            switch (instance.repository.name) {
                case 'FTP':
                    // items = await integrations.ftp(configuration).list(path);
                    break;

                case 'Amazon S3':
                    items = await integrations.amazon.s3(configuration).create({path});
                    break;

                case 'Google Cloud Storage':
                    // items = await integrations.google.cloudStorage(configuration).list(path);
                    break;
            }

            response.locals.response = {items};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}