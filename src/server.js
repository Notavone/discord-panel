const {TOKEN, PORT} = require('./config.js');
const Discord = require('discord.js');
const client = new Discord.Client();


const express = require('express');
const app = express();

const {Server} = require('socket.io');
const http = require('http').createServer(app);
const ioServer = new Server(http);

app.use(express.static('public'));
app.use('*', (req, res, next) => {
    req.client = client;
    req.io = ioServer;
    next()
});

const apiRoutes = require('./api/api.js');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.render('index')
});

http.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});

ioServer.on('connection', (socket) => {
    console.log('Socket connected');
    socket.on('disconnect', () => {
        console.log("Socket disconnected")
    })
        .on('clientMessageSend', async (messageContent, channelID) => {
            if (messageContent && !messageContent.match(/^\s$/)) await client.channels.cache.get(channelID).send(messageContent)
        })
        .on('clientMessageDelete', async (messageID, channelID) => {
            console.log(messageID, channelID);
            console.log(client.channels.cache.get(channelID))
        })
});

client.on('message', (message) => {
    ioServer.emit("discordMessage", message)
})
    .on('messageUpdate', (oldMessage, newMessage) => {
        ioServer.emit("discordMessageUpdate", oldMessage, newMessage)
    })
    .on('messageDelete', (message) => {
        ioServer.emit('discordMessageDelete', message)
    })
    .on('messageDeleteBulk', (messages) => {
        ioServer.emit('discordMessageDeleteBulk', messages)
    });

client.login(TOKEN);