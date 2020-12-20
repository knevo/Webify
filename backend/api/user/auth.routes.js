const router = require('express').Router();
const userService = require('./user.service');

router.get('/', async (req, res) => {
    if (req.session.loggedUser) {
        try {
            let loggedUser = await userService.getById(req.session.loggedUser._id);
            req.session.loggedUser = loggedUser;
            return _parseUserObj(res, loggedUser);

        } catch (err) {
            return res.json({ error: 'You are not logged in.' });
        }
    }
    return res.json({ error: 'You are not logged in.' });
});

router.post('/', async (req, res) => {
    if (req.session.loggedUser) return res.json({ error: 'Already logged in.' });
    const userData = req.body;

    try {
        const createdUser = await userService.create(userData, req);
        req.session.loggedUser = createdUser;
        return _parseUserObj(res, createdUser);
    } catch (err) {
        return res.json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    if (req.session.loggedUser) return res.json({ error: 'Already logged in.' });

    const loginData = req.body;
    try {
        const userMatches = await userService.checkCredentials(loginData);
        req.session.loggedUser = userMatches;
        return _parseUserObj(res, userMatches);
    } catch (err) {
        return res.json({ error: err.message });
    }
});

router.post('/logout', (req, res) => {
    let loggedUser = req.session.loggedUser;
    if (!loggedUser) return res.json({ error: 'You are not logged in.' });
    req.session.loggedUser = null;
    return res.json({ message: 'Logged out successfully' });
});

function _parseUserObj(res, userObj) {
    let loggedUser = { ...userObj };
    delete loggedUser.password;
    return res.json(loggedUser);
}

module.exports = router;