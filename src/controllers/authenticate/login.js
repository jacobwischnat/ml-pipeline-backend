const jwt = require('jsonwebtoken');
const boom = require('boom');
const bcrypt = require('bcrypt');
const {promisify} = require('util');

const jwtSign = promisify(jwt.sign);
const bcryptCompare = promisify(bcrypt.compare);

const constants = require('../../constants');

const fileModel = require('../../models/file');
const userModel = require('../../models/user');
const accountModel = require('../../models/account');

module.exports = ({dataSource}) => {
    const Account = accountModel.getModel(dataSource);
    const File = fileModel.getModel(dataSource);
    const User = userModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {email, password} = request.body;

            if (!email || !password) throw boom.notAcceptable('Email or Password not provided');

            const user = await User.findOne({
                where: {email},
                include: [
                    {
                        model: Account,
                        as: 'accounts'
                    },
                    {
                        model: File,
                        as: 'avatar'
                    }
                ]
            });

            if (!user) throw boom.unauthorized('Authentication failed - No User with that email found.');

            const authenticated = await bcryptCompare(password, user.password);
            if (authenticated && user.accounts.length) {
                const [account] = user.accounts;
                const expiresAt = Date.now() + constants.DEFAULT_JWT_EXPIRATION;
                const payload = {
                    expiresAt,
                    userId: user.id,
                    accountId: account.id,
                    accounts: user.accounts.map(({id}) => id),
                };
                console.log(payload);
                const token = await jwtSign(payload, process.env.JWTSECRET);

                response.cookie('token', token, {expiresAt});
                response.json({
                    ok: true,
                    response: {
                        token,
                        account,
                        accountId: account.id,
                        userId: user.id,
                        avatar: user.avatar && user.avatar.id
                    },
                });
                return;
            }

            throw boom.unauthorized('Authentication failed - Password doesn\'t match');
        } catch (ex) {
            next(ex);
        }
    };
}