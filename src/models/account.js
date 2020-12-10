const {Sequelize} = require('sequelize');

const fileModel = require('../models/file');

const table = 'account';
const name = 'Account';

const schema = {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    icon: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
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
    getModel: sequelize => {
        const model = sequelize.define(name, schema, options);

        const File = fileModel.getModel(sequelize);
        model.hasOne(File, {as: 'avatar', sourceKey: 'icon', foreignKey: 'id'});

        return model;
    },
};