const account = require('../models/account.js');

module.exports = {
    up: sequelize => sequelize.createTable('account', account.schema, account.options),
    down: sequelize => sequelize.dropTable('account'),
};