const express = require('express');

const createCrudRoutes = (SERVICE_PATH) => {

    const router = express.Router();
    const SERVICE = require(SERVICE_PATH);

    // First verify user is authorized to access the page based on a function from the service.
    router.use('/', async (req, res, next) => {
        try {
            await SERVICE.verifyCrudAuths(req);
            next();
        } catch (err) {
            return res.status(401).json({ error: 'You are not authorized to access this page.' });
        }
    });

    // Create
    router.post('/', async (req, res) => {
        const itemData = req.body;
        try {
            const itemCreated = await SERVICE.create(itemData, req);
            return res.json(itemCreated);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    });

    // Read Specific
    router.get('/:id', async (req, res) => {
        try {
            const foundItem = await SERVICE.getById(req.params.id, req);
            return res.json(foundItem);
        } catch (err) {
            return res.status(404).json({ error: err.message })
        }
    });

    // Update
    router.put('/:id', async (req, res) => {
        const itemUpdates = req.body;
        try {
            const updatedItem = await SERVICE.updateById(req.params.id, itemUpdates, req);
            return res.json(updatedItem);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    });

    // Delete
    router.delete('/:id', async (req, res) => {
        try {
            await SERVICE.deleteById(req.params.id, req);
            return res.json({ message: `"${req.params.id}" Deleted Successfully.` });
        } catch (err) {
            return res.status(404).json({ error: err.message })
        }
    });

    // List
    router.get('/', async (req, res) => {
        const filterBy = req.query;
        try {
            const items = await SERVICE.query(filterBy, req);
            return res.json(items);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    });

    return router;
}

module.exports = createCrudRoutes;