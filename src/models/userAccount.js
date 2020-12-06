const {Sequelize} = require('sequelize');

const table = 'user_account';
const name = 'UserAccount';

const schema = {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        field: 'user_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    accountId: {
        field: 'account_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: true,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        allowNull: true,
    },
    deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE,
        allowNull: true,
    }
}

const options = {
    tableName: table,
    timestamps: true,
    paranoid: true,
    underscored: true
};

module.exports = {
    table,
    name,
    schema,
    options,
    getModel: sequelize => sequelize.define(name, schema, options),
};