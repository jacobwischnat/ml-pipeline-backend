const fileModel = require('../../models/file');
const accountModel = require('../../models/account');
const userAccountModel = require('../../models/userAccount');

module.exports = ({dataSource}) => {
    const File = fileModel.getModel(dataSource);
    const Account = accountModel.getModel(dataSource);
    const UserAccount = userAccountModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {userId} = request.locals.user;
            const {name} = request.body;
            const icon = request.file;
            const account = await Account.create({name});

            console.log(icon);

            await UserAccount.create({accountId: account.id, userId});

            if (icon) {
                const file = await File.create({
                    size: icon.size,
                    owner: account.id,
                    type: icon.mimetype,
                    name: icon.filename,
                    path: `/files/${icon.filename}`,
                });

                account.icon = file.id;
                await account.save();
            }

            response.locals.response = {account};
            next();
        } catch (ex) {
            next(ex);
        }
    };
}