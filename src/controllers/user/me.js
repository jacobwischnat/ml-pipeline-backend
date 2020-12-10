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
                        model: Account,
                        as: 'accounts',
                        include: [
                            {
                                model: File,
                                as: 'avatar'
                            }
                        ]
                    },
                    {
                        model: File,
                        as: 'avatar'
                    }
                ]
            });

            if (!user) throw boom.notFound('User not found');

            const account = user.accounts.find(({id}) => id === accountId);

            response.locals.response = {
                user,
                userId,
                account,
                accountId,
                accounts: user.accounts,
                avatar: user.avatar && user.avatar.id
            };
            next();
        } catch (ex) {
            next(ex);
        }
    }
}