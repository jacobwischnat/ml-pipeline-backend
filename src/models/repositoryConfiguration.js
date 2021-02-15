const {Sequelize} = require('sequelize');

const table = 'repository_configuration';
const name = 'RepositoryConfiguration';

const repositoryTemplate = require('./repositoryTemplate');

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
    repositoryInstanceId: {
        field: 'repository_instance_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    repositoryTemplateId: {
        field: 'repository_template_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    value: {
        type: Sequelize.TEXT,
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

        const RepositoryTemplate = repositoryTemplate.getModel(sequelize);

        model.hasOne(RepositoryTemplate, {
            foreignKey: 'id',
            sourceKey: 'repositoryTemplateId',
            as: 'template'
        });

        return model;
    },
};