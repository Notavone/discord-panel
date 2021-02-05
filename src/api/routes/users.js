const router = require('express').Router();

router.use('/:userID', async (req, res) => {
    let query = req.query.query;
    let userID = req.params.userID;
    let user = req.client.users.cache.get(userID);
    res.json(query ? await user[query] : await user)
});

router.use('/', (req, res) => {
    res.json(req.client.users.cache.array())
});

module.exports = router;