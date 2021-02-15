const repositoryTemplateModel = require('../models/repositoryTemplate');

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(repositoryTemplateModel.table, [
        { id: 1, repository_id: 1, index: 2, name: 'Host Name / IP', description: 'The hostname or IP of the SMB server', type: 'text', default: '127.0.0.1', created_at: new Date(), updated_at: new Date() },
        { id: 2, repository_id: 1, index: 3, name: 'Port', description: 'The Port of the SMB server service', type: 'number', default: '445', created_at: new Date(), updated_at: new Date() },
        { id: 3, repository_id: 1, index: 4, name: 'Username', description: 'The Username to auth with', type: 'text', default: 'root', created_at: new Date(), updated_at: new Date() },
        { id: 4, repository_id: 1, index: 5, name: 'Password', description: 'The Password to auth with', type: 'password', default: 'hunter7', created_at: new Date(), updated_at: new Date() },
        { id: 5, repository_id: 5, index: 2, name: 'Email', description: 'The Service Account email to auth with', type: 'text', default: '.iam.gserviceaccount.com', created_at: new Date(), updated_at: new Date() },
        { id: 6, repository_id: 5, index: 3, name: 'Key', description: 'The Service Account key to auth with', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 7, repository_id: 3, index: 0, name: 'host', description: '', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 8, repository_id: 3, index: 1, name: 'port', description: '', type: 'text', default: '21', created_at: new Date(), updated_at: new Date() },
        { id: 9, repository_id: 3, index: 2, name: 'user', description: '', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 10, repository_id: 3, index: 3, name: 'password', description: '', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 11, repository_id: 9, index: 0, name: 'bucket', description: '', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 12, repository_id: 9, index: 1, name: 'region', description: '', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 13, repository_id: 9, index: 2, name: 'accessKeyId', description: '', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 14, repository_id: 9, index: 3, name: 'secretAccessKey', description: '', type: 'text', default: '', created_at: new Date(), updated_at: new Date() },
        { id: 15, repository_id: 9, index: 4, name: 'httpOptions.timeout', description: '', type: 'text', default: '90000', created_at: new Date(), updated_at: new Date() }
    ]),
    down: queryInterface => queryInterface.bulkDelete(repositoryTemplateModel.table, null, {})
};