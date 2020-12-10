const {Sequelize} = require('sequelize');

const file = require('./file');
const account = require('./account');
const userAccount = require('./userAccount');

const table = 'user';
const name = 'User';

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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
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

        const File = file.getModel(sequelize);
        const Account = account.getModel(sequelize);
        const UserAccount = userAccount.getModel(sequelize);

        model.hasOne(File, {as: 'avatar', sourceKey: 'icon', foreignKey: 'id'});
        model.belongsToMany(Account, {
            through: UserAccount,
            as: 'accounts'
        });

        return model;
    },
};