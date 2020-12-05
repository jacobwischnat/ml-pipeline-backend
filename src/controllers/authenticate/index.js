const {promisify} = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSign = promisify(jwt.sign);
const bcryptCompare = promisify(bcrypt.compare);

const constants = require('../../constants');
const userModel = require('../../models/user');

module.exports = {
    login: ({dataSource}) => async (request, response) => {
        const {email, password} = request.body;
        const User = userModel.getModel(dataSource);

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            response.status(401);
            response.end();

            return;
        }

        const {password: passwordHash} = user.toJSON();

        const authenticated = await bcryptCompare(password, passwordHash);

        if (authenticated) {
            const expiresAt = Date.now() + constants.DEFAULT_JWT_EXPIRATION;
            const payload = {userId: user.id, expiresAt};
            const token = await jwtSign(payload, process.env.JWTSECRET);

            response.locals.result = {token};

            next();
            return;
        }

        response.status(401);
        response.end();
    }
};