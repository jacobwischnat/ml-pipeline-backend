const jwt = require('jsonwebtoken');
const boom = require('boom');
const {v4} = require('uuid');
const bcrypt = require('bcrypt');
const {promisify} = require('util');

const jwtSign = promisify(jwt.sign);
const bcryptHash = promisify(bcrypt.hash);

const constants = require('../../constants');

const userModel = require('../../models/user');
const inviteModel = require('../../models/invite');
const userAccountModel = require('../../models/userAccount');

module.exports = {
    accept: ({dataSource}) => async (request, response, next) => {
        try {
            const {name, email, password, uuid} = request.body;

            const User = userModel.getModel(dataSource);
            const Invite = inviteModel.getModel(dataSource);
            const UserAccount = userAccountModel.getModel(dataSource);

            const invite = await Invite.findOne({where: {email, uuid}});

            if (!invite) throw boom.notFound('Invite not found or already activated');

            const {accountId} = invite;
            const hashedPassword = await bcryptHash(password, 10);
            const [user, created] = await User.findOrCreate({
                where: {name, email},
                defaults: {
                    name,
                    email,
                    password: hashedPassword
                }
            });
            await UserAccount.findOrCreate({
                where: {userId: user.id, accountId},
                defaults: {userId: user.id, accountId}
            });

            const expiresAt = Date.now() + constants.DEFAULT_JWT_EXPIRATION;
            const payload = {
                userId: user.id,
                accountId,
                expiresAt
            };

            await invite.destroy();

            const token = await jwtSign(payload, process.env.JWTSECRET);

            response.cookie('token', token, {expiresAt});
            response.json({
                ok: true,
                response: {
                    token,
                    accountId,
                    userId: user.id,
                    avatar: user.avatar && user.avatar.id
                },
            });
        } catch (ex) {
            next(ex);
        }
    },
    create: ({dataSource}) => {
        const Invite = inviteModel.getModel(dataSource);

        return async (request, response, next) => {
            try {
                const {accountId} = request.locals.user;
                const {email} = request.body;
                const uuid = v4();

                if (!email) throw boom.notAcceptable('Email must be provided');

                await Invite.create({email, accountId, uuid});

                // TODO: Send email??

                response.locals.response = {};
                next();
            } catch (ex) {
                next(ex);
            }
        }
    }
}