const file = require('../models/file.js');

module.exports = {
    up: sequelize => sequelize.createTable(file.table, file.schema, file.options),
    down: sequelize => sequelize.dropTable(file.table),
};
