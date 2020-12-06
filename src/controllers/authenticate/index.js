const jwt = require('jsonwebtoken');
const boom = require('boom');
const bcrypt = require('bcrypt');
const {promisify} = require('util');

const jwtSign = promisify(jwt.sign);
const bcryptCompare = promisify(bcrypt.compare);

const constants = require('../../constants');
const userModel = require('../../models/user');

module.exports = {
    login: ({dataSource}) => async (request, response, next) => {
        try {
            const {email, password} = request.body;

            if (!email || !password) throw boom.notAcceptable('Email or Password not provided');

            const User = userModel.getModel(dataSource);
            const user = await User.findOne({where: {email}});

            if (!user) throw boom.unauthorized('Authentication failed');

            const {password: passwordHash} = user.toJSON();
            const authenticated = await bcryptCompare(password, passwordHash);

            if (authenticated) {
                const expiresAt = Date.now() + constants.DEFAULT_JWT_EXPIRATION;
                const payload = {userId: user.id, expiresAt};
                const token = await jwtSign(payload, process.env.JWTSECRET);

                response.json({
                    ok: true,
                    response: {token}
                });
                return;
            }

            throw boom.unauthorized('Authentication failed');
        } catch (ex) {
            next(ex);
        }
    }
};