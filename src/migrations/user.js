const user = require('../models/user.js');

module.exports = {
    up: sequelize => sequelize.createTable(user.table, user.schema, user.options),
    down: sequelize => sequelize.dropTable(user.table),
};
