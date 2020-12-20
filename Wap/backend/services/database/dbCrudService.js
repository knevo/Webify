const dbService = require('./db.service'),
    ObjectId = require('mongodb').ObjectId;

class dbCrudService {
    getById = async (itemId, requestData) => {
        const collection = await dbService.getCollection(this.collectionName);
        try {
            return await collection.findOne({ "_id": ObjectId(itemId) });
        } catch (err) {
            throw new Error(`Cannot find item with ID: ${itemId}`);
        }
    }


    query = async (filterBy = {}, requestData, project = {}) => {
        const collection = await dbService.getCollection(this.collectionName);
        try {
            return await collection.find(filterBy, { projection: project }).toArray();
        } catch (err) {
            throw new Error(`Cannot find items.`);
        }
    }

    constructor(collectionName) {
        this.collectionName = collectionName;
    }
}

module.exports = dbCrudService;