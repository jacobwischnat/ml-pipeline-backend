const {Sequelize} = require('sequelize');

const userModel = require('../models/user');
const userAccountModel = require('../models/userAccount');

const table = 'repository';
const name = 'Repository';

const schema = {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: true
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

        // const User = userModel.getModel(sequelize);
        // const UserAccount = userAccountModel.getModel(sequelize);

        // model.belongsToMany(User, {
        //     through: UserAccount,
        //     as: 'accounts'
        // });

        return model;
    }
};