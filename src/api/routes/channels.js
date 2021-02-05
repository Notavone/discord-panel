const router = require('express').Router();

router.use('/:channelID/fetch', async (req, res) => {
    let channelID = req.params.channelID;
    let channel = req.client.channels.cache.get(channelID);
    res.json(await channel.messages.fetch())
});

router.use('/:channelID/:messageID', async (req, res) => {
    let query = req.query.query;
    let channelID = req.params.channelID;
    let messageID = req.params.messageID;
    let channel = req.client.channels.cache.get(channelID);
    let message = channel.messages.cache.get(messageID);
    res.json(query ? await message[query] : await message)
});

router.use('/:channelID', async (req, res) => {
    let query = req.query.query;
    let channelID = req.params.channelID;
    let channel = req.client.channels.cache.get(channelID);
    res.json(query ? await channel[query] : await channel)
});

router.use('/', (req, res) => {
    res.json(req.client.channels.cache.array())
});

module.exports = router;