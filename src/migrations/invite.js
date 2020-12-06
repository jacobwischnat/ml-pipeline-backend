const invite = require('../models/invite.js');

module.exports = {
    up: sequelize => sequelize.createTable('invite', invite.schema, invite.options),
    down: sequelize => sequelize.dropTable('invite'),
};
