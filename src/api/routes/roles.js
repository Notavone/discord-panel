const router = require('express').Router();

router.use('/:guildID/:roleID', (req, res) => {
    let query = req.query.query;
    let guildID = req.params.guildID;
    let roleID = req.params.roleID;
    let guild = req.client.guilds.cache.get(guildID);
    let role = guild.roles.cache.get(roleID);
    res.json(query ? role[query] : role)
});

router.use('/:guildID', (req, res) => {
    let guildID = req.params.guildID;
    let guild = req.client.guilds.cache.get(guildID);
    res.json(guild.roles.cache.array())
});

router.use('/', (req, res) => {
    res.json(req.client.roles.cache.array())
});

module.exports = router;