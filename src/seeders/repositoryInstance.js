const repositoryInstanceModel = require('../models/repositoryInstance');

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(repositoryInstanceModel.table, [
        { id: 1, account_id: 1, name: 'jacobs-google-cloud-storage', description: 'My gcp gcs instance', repository_id: 5, created_at: new Date(), updated_at: new Date() },
    ]),
    down: queryInterface => queryInterface.bulkDelete(repositoryInstanceModel.table, null, {})
};