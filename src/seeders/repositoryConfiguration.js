const repositoryConfigurationModel = require('../models/repositoryConfiguration');

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(repositoryConfigurationModel.table, [
        { id: 1, account_id: 1, repository_instance_id: 1, repository_template_id: 5, value: '.iam.gserviceaccount.com', created_at: new Date(), updated_at: new Date() },
        { id: 2, account_id: 1, repository_instance_id: 1, repository_template_id: 6, value: 'my-super-secret-key', created_at: new Date(), updated_at: new Date() },
    ]),
    down: queryInterface => queryInterface.bulkDelete(repositoryConfigurationModel.table, null, {})
};