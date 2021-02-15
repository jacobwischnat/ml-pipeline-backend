const {Sequelize} = require('sequelize');

const repositoryModel = require('./repository');
const repositoryConfigModel = require('./repositoryConfiguration');

const table = 'repository_instance';
const name = 'RepositoryInstance';

const schema = {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    accountId: {
        field: 'account_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    repositoryId: {
        field: 'repository_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
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

        const Repository = repositoryModel.getModel(sequelize);
        const RepositoryConfiguration = repositoryConfigModel.getModel(sequelize);

        model.hasOne(Repository, {
            sourceKey: 'repositoryId',
            foreignKey: 'id',
            as: 'repository'
        });
        model.hasMany(RepositoryConfiguration, {
            sourceKey: 'id',
            foreignKey: 'repositoryInstanceId',
            as: 'configuration'
        });

        return model;
    },
};