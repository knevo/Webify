const dbService = require('../../services/database/db.service'),
    dbCrudService = require('../../services/database/dbCrudService'),
    ContactRequest = require('./ContactRequest');

let wapCrudService = new dbCrudService('waps');

async function placeContactRequest(formData, requestData) {
    await wapCrudService.getById(requestData.params.id, requestData);

    const newContactRequest = new ContactRequest(formData, requestData);
    const collection = await dbService.getCollection('contact-requests');

    try {
        await collection.insertOne(newContactRequest);
        return { message: 'Sent Successfully' };
    } catch (err) {
        throw new Error('Failed to send the form.');
    }
}

module.exports = {
    ...wapCrudService,
    create: placeContactRequest
};