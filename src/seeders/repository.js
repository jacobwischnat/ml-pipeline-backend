const repositoryModel = require('../models/repository');

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(repositoryModel.table, [
        { id: 1, name: 'SMB File Share', icon: 'mdiFolderNetworkOutline', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 2, name: 'CIFS File Share', icon: 'mdiFolderNetwork', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 3, name: 'FTP', icon: 'mdiFileSwap', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 4, name: 'SFTP', icon: 'mdiBookLock', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 5, name: 'Apple File Share', icon: 'mdiApple', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 6, name: 'Local Disk', icon: 'mdiHarddisk', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 7, name: 'Google Cloud Storage', icon: 'mdiGoogle', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 8, name: 'Google Drive', icon: 'mdiGoogleDrive', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 9, name: 'Amazon S3', icon: 'mdiAmazon', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 10, name: 'Microsoft One Drive', icon: 'mdiMicrosoftOnedrive', description: '', created_at: new Date(), updated_at: new Date() },
        { id: 11, name: 'Microsoft Azure Storage', icon: 'mdiMicrosoftAzure', description: '', created_at: new Date(), updated_at: new Date() },
    ]),
    down: queryInterface => queryInterface.bulkDelete(repositoryModel.table, null, {})
};