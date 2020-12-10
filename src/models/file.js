const {Sequelize} = require('sequelize');

const table = 'file';
const name = 'File';

const schema = {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    size: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    owner: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
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