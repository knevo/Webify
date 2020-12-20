const express = require('express');

const createCrudRoutes = (SERVICE_PATH) => {

    const router = express.Router();
    const SERVICE = require(SERVICE_PATH);

    // Read Specific
    router.get('/:id', async (req, res) => {
        try {
            const foundItem = await SERVICE.getById(req.params.id, req);
            return res.json(foundItem);
        } catch (err) {
            return res.status(404).json({ error: err.message })
        }
    });

    router.post('/:id', async (req, res) => {
        const itemData = req.body;
        try {
            const itemCreated = await SERVICE.create(itemData, req);
            return res.json(itemCreated);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    });

    // // List
    // router.get('/', async (req, res) => {
    //     const filterBy = req.query;
    //     try {
    //         const items = await SERVICE.query(filterBy, req);
    //         return res.json(items);
    //     } catch (err) {
    //         return res.status(404).json({ error: err.message });
    //     }
    // });

    return router;
}

module.exports = createCrudRoutes;