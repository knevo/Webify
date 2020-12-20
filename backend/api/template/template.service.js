const dbCrudService = require('../../services/database/dbCrudService'),
    Template = require('./TemplateModel');

let templateCrudDbService = new dbCrudService('templates');

function query(filterBy = {}, requestData) {
    return templateCrudDbService.query(filterBy, requestData, { settings: 1 });
}

function create(templateData, requestData) {
    const { loggedUser } = requestData.session;

    const newTemplate = new Template(templateData, loggedUser);
    return templateCrudDbService.create(newTemplate);
}

function verifyCrudAuths(requestData) { // The Credentials needed for authorization
    return new Promise((resolve, reject) => {
        let { loggedUser } = requestData.session;

        switch (requestData.method) {
            case 'GET':
                return resolve();
            case 'POST':
                return loggedUser ? resolve() : reject();
            default:
                return loggedUser ? resolve() : reject();
            // return loggedUser && loggedUser.isAdmin ? resolve() : reject();
        }
    });
    // return Promise.resolve();
}

module.exports = {
    ...templateCrudDbService,
    create,
    query,
    verifyCrudAuths
};