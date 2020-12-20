const dbService = require('./db.service'),
    ObjectId = require('mongodb').ObjectId;

class dbCrudService {
    create = async (itemData, requestData) => {
        const collection = await dbService.getCollection(this.collectionName);
        try {
            await collection.insertOne(itemData);
            return itemData;
        } catch (err) {
            throw new Error('Failed to create the item.');
        }
    }

    getById = async (itemId, requestData) => {
        const collection = await dbService.getCollection(this.collectionName);
        try {
            return await collection.findOne({ "_id": ObjectId(itemId) });
        } catch (err) {
            throw new Error(`Cannot find item with ID: ${itemId}`);
        }
    }

    getOneByField = async (field, requestData) => {
        const collection = await dbService.getCollection(this.collectionName);
        try {
            return await collection.findOne(field);
        } catch (err) {
            throw new Error('Cannot find item.');
        }
    }

    updateById = async (itemId, itemData, requestData) => {
        const collection = await dbService.getCollection(this.collectionName);

        try {
            let dataClone = { ...itemData };
            delete dataClone._id;
            await collection.updateOne({ "_id": ObjectId(itemId) }, { $set: dataClone });
            return itemData;
        } catch (err) {
            throw new Error(`Cannot update item with ID: ${itemId}`);
        }
    }

    deleteById = async (itemId, requestData) => {
        const collection = await dbService.getCollection(this.collectionName);
        try {
            return await collection.deleteOne({ "_id": ObjectId(itemId) });
        } catch (err) {
            throw new Error(`Cannot delete item with ID: ${itemId}`);
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