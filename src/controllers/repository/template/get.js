const boom = require('boom');

const repositoryTemplateModel = require('../../../models/repositoryTemplate');

module.exports = ({dataSource}) => {
    const RepositoryTemplate = repositoryTemplateModel.getModel(dataSource);

    return async (request, response, next) => {
        try {
            const {repositoryId} = request.params;
            const fields = await RepositoryTemplate.findAll({
                where: {repositoryId}
            });

            response.locals.response = {fields};
            next();
        } catch (ex) {
            next(ex);
        }
    }
}