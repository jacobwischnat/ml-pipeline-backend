const boom = require('boom');

const fileModel = require('../../models/file');
const userModel = require('../../models/user');
const accountModel = require('../../models/account');

module.exports = ({dataSource}) => {
    const File = fileModel.getModel(dataSource);
    const User = userModel.getModel(dataSource);
    const Account = accountModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {accountId} = request.locals.user;
            const users = await User.findAll({
                include: [
                    {
                        where: {id: accountId},
                        model: Account,
                        as: 'accounts'
                    },
                    {
                        model: File,
                        as: 'avatar'
                    }
                ]
            });

            response.locals.response = {users};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}