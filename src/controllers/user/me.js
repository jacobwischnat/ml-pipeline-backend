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
            const {userId, accountId} = request.locals.user;
            const user = await User.findOne({
                where: {id: userId},
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

            console.log(user);

            if (!user) throw boom.notFound('User not found');

            response.locals.response = {
                userId,
                accountId,
                avatar: user.avatar && user.avatar.id
            };
            next();
        } catch (ex) {
            next(ex);
        }
    }
}