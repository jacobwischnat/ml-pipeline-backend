const jwt = require('jsonwebtoken');
const boom = require('boom');
const {promisify} = require('util');

const constants = require('../../constants');

const fileModel = require('../../models/file');
const userModel = require('../../models/user');
const accountModel = require('../../models/account');

const jwtSign = promisify(jwt.sign);

module.exports = ({dataSource}) => {
    const Account = accountModel.getModel(dataSource);
    const File = fileModel.getModel(dataSource);
    const User = userModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {accountId} = request.params;
            const {userId} = request.locals.user;

            const user = await User.findOne({
                where: {id: userId},
                include: [
                    {
                        model: Account,
                        as: 'accounts'
                    }
                ]
            });

            if (!user || !user.accounts.some(({id}) => id !== Number(accountId))) {
                throw boom.forbidden('Account not accessible');
            }

            const expiresAt = Date.now() + constants.DEFAULT_JWT_EXPIRATION;
            const payload = {
                userId,
                expiresAt,
                accountId: Number(accountId),
                accounts: user.accounts.map(({id}) => id),
            };
            console.log(payload);
            const token = await jwtSign(payload, process.env.JWTSECRET);

            response.cookie('token', token, {expiresAt});
            response.locals.response = {token};

            next();
        } catch (ex) {
            next(ex);
        }
    };
}