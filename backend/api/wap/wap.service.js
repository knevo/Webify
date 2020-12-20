const dbCrudService = require('../../services/database/dbCrudService'),
    Wap = require('../template/TemplateModel');

let wapCrudService = new dbCrudService('waps');

function query(filterBy = {}, requestData) {
    return wapCrudService.query(filterBy, requestData, { settings: 1 });
}

function create(websiteData, requestData) {
    const { loggedUser } = requestData.session;

    const newWap = new Wap(websiteData, loggedUser);
    return wapCrudService.create(newWap);
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
    ...wapCrudService,
    create,
    query,
    verifyCrudAuths
};