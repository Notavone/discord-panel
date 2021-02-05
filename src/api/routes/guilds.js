const router = require('express').Router();

router.use('/:guildID/:channelID/:messageID', async (req, res) => {
    let query = req.query.query;
    let guildID = req.params.guildID;
    let channelID = req.params.channelID;
    let messageID = req.params.messageID;
    let guild = req.client.guilds.cache.get(guildID);
    let channel = guild.channels.cache.get(channelID);
    let message = channel.messages.cache.get(messageID);
    res.json(query ? await message[query] : await message)
});

router.use('/:guildID/:channelID', async (req, res) => {
    let query = req.query.query;
    let guildID = req.params.guildID;
    let channelID = req.params.channelID;
    let guild = req.client.guilds.cache.get(guildID);
    let channel = guild.channels.cache.get(channelID);
    res.json(query ? await channel[query] : await channel)
});

router.use('/:guildID', async (req, res) => {
    let query = req.query.query;
    let guildID = req.params.guildID;
    let guild = req.client.guilds.cache.get(guildID);
    res.json(query ? await guild[query] : await guild)
});

router.use('/', (req, res) => {
    res.json(req.client.guilds.cache.array())
});

module.exports = router;