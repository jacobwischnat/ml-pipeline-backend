const model = require('../models/repository.js');

module.exports = {
    up: sequelize => sequelize.createTable(model.table, model.schema, model.options),
    down: sequelize => sequelize.dropTable(model.table),
};
