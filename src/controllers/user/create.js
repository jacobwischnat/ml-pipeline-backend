const {promisify} = require('util');
const bcrypt = require('bcrypt');

const bcryptHash = promisify(bcrypt.hash);

const userModel = require('../../models/user');

module.exports = ({dataSource}) => async (request, response) => {
    const {name, email, password} = request.body;
    const User = userModel.getModel(dataSource);

    console.log({name, email, password});

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
        response.status(401);
        response.end();

        return;
    }

    const {id} = user.toJSON();

    response.json({id, name, email});
}