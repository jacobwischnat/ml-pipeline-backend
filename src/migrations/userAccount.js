const userAccount = require('../models/userAccount.js');

module.exports = {
    up: sequelize => sequelize.createTable(userAccount.table, userAccount.schema, userAccount.options),
    down: sequelize => sequelize.dropTable(userAccount.table),
};