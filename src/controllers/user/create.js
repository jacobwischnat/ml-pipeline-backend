const {promisify} = require('util');
const bcrypt = require('bcrypt');
const boom = require('boom');

const bcryptHash = promisify(bcrypt.hash);

const userModel = require('../../models/user');

module.exports = ({dataSource}) => async (request, response, next) => {
    try {
        const {name, email, password} = request.body;
        const User = userModel.getModel(dataSource);

        const hashedPassword = await bcryptHash(password, 10);

        const [user, created] = await User.findOrCreate({
            where: {email},
            defaults: {
                name,
                email,
                password: hashedPassword
            }
        });

        if (!created) {
            throw boom.notAcceptable('User with that email already exists');
        }

        response.locals.response = {id: user.id, name, email};
    } catch (ex) {
        next(ex);
    }
}