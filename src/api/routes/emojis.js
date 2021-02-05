const router = require('express').Router();
const request = require('request');
const fs = require('fs');

async function download(url, path, callback) {
    await request.head(url, async (err, res, body) => {
        await request(url).pipe(fs.createWriteStream(path)).on('close', callback)
    })
}

async function downloadEmojis(emojis) {
    fs.readdirSync('emojis/').forEach((file) => {
        fs.unlink(`emojis/${file}`, () => 0)
    });
    for (const emoji of emojis) {
        let url = emoji.url;
        let path = `emojis/${emoji.name}.${emoji.animated ? 'gif' : 'png'}`;
        await download(url, path, () => 0)
    }
}

router.use('/:guildID', async (req, res) => {
    let guildID = req.params.guildID;
    let guild = req.client.guilds.cache.get(guildID);
    let emojis = guild.emojis.cache.array();
    await downloadEmojis(emojis);

    await res.json({message: 'done'})
});

router.use('/', async (req, res) => {
    let emojis = req.client.emojis.cache.array();
    await downloadEmojis(emojis);

    await res.json({message: 'done'})
});

module.exports = router;