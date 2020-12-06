const boom = require('boom');
const {v4} = require('uuid');
const bcrypt = require('bcrypt');
const {promisify} = require('util');

const bcryptHash = promisify(bcrypt.hash);

const userModel = require('../../models/user');
const inviteModel = require('../../models/invite');
const userAccountModel = require('../../models/userAccount');

module.exports = {
    activate: ({dataSource}) => async (request, response, next) => {
        try {
            const {name, email, password, uuid} = request.body;

            const User = userModel.getModel(dataSource);
            const Invite = inviteModel.getModel(dataSource);
            const UserAccount = userAccountModel.getModel(dataSource);

            const invite = await Invite.findOne({where: {email, uuid}});

            if (!invite) throw boom.notFound('Invite not found or already activated');

            const hashedPassword = await bcryptHash(password, 10);
            const user = await User.create({name, email, password: hashedPassword});
            await UserAccount.create({userId: user.id, accountId: invite.accountId});
            await invite.destroy();

            response.locals.response = {};
        } catch (ex) {
            next(ex);
        }
    },
    create: ({dataSource}) => async (request, response, next) => {
        try {
            const {accountId: currentUserAccountId} = request.locals.user;
            const {email, accountId} = request.body;
            const Invite = inviteModel.getModel(dataSource);

            if (accountId !== currentUserAccountId) throw boom.unauthorized('Not Allowed');

            await Invite.create({email, accountId, uuid: v4()});

            // TODO: Send email??

            response.locals.response = {};
        } catch (ex) {
            next(ex);
        }
    }
}