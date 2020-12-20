const dbCrudService = require('../../services/database/dbCrudService');

let contactCrudService = new dbCrudService('contacts-request');

function query(filterBy, requestData) {
    let { wapId } = filterBy;
    if (wapId) {
        return contactCrudService.query(filterBy, requestData, { wapId });
    } else {
        throw new Error(`No Wap ID was provided`);
    }
}

function verifyCrudAuths(requestData) { // The Credentials needed for authorization
    return new Promise((resolve, reject) => {
        let { loggedUser } = requestData.session;

        switch (requestData.method) {
            case 'GET':
                return loggedUser ? resolve() : reject();
            case 'UPDATE':
            case 'DELETE':
                return loggedUser ? resolve() : reject();
            default:
                return reject();
            // return loggedUser && loggedUser.isAdmin ? resolve() : reject();
        }
    });
    // return Promise.resolve();
}

module.exports = {
    ...contactCrudService,
    query,
    verifyCrudAuths
};