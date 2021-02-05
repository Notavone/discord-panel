const socket = io();
const selectGuild = document.getElementById('selectGuild');
const selectChannel = document.getElementById('selectChannel');
const divChat = document.getElementById('divChat');
const textareaChat = document.getElementById('textareaChat');
const buttonSendMessage = document.getElementById('buttonSendMessage');
const checkAutoScroll = document.getElementById('checkAutoScroll');
const emojiCollapse = document.getElementById('emojiCollapse');
const roleCollapse = document.getElementById('roleCollapse');
const memberCollapse = document.getElementById('memberCollapse');

let lastMessageAuthorID;


async function fetchGuilds() {
    selectGuild.clear();
    let guilds = await JSON.get('/api/guilds');
    for (const guild of guilds) {
        let optionElement = new Option(guild.name, guild.id);
        selectGuild.append(optionElement)
    }
    await fetchChannels()
}

async function fetchChannels() {
    selectChannel.clear();
    let guildID = selectGuild.value;
    let channels = (await JSON.get(`/api/guilds/${guildID}?query=channels`)).cache;
    for (const channel of channels.filter((channel) => channel.type === "text")) {
        let optionElement = new Option(channel.name, channel.id);
        selectChannel.append(optionElement)
    }

    divChat.innerHTML = '';
    await getInfo();
    await fetchMessages()
}

async function getInfo() {
    let guildID = selectGuild.value;
    let emojis = (await JSON.get(`/api/guilds/${guildID}?query=emojis`)).cache;
    let roles = (await JSON.get(`/api/guilds/${guildID}?query=roles`)).cache;
    let members = (await JSON.get(`/api/guilds/${guildID}?query=members`)).cache;

    emojiCollapse.innerHTML = '';
    emojis.forEach((emoji) => {
        emojiCollapse.innerHTML += `<a><img class="emoji" onclick="textareaChat.value += '<${emoji.animated ? 'a:' : ':'}${emoji.name}:${emoji.id}> '" src="${emoji.url}" alt="${emoji.name}"> ${emoji.name}</a>`
    });
    roleCollapse.innerHTML = '';
    roles.forEach((role) => {
        roleCollapse.innerHTML += `<a onclick="textareaChat.value += '<@&${role.id}> '">@${role.name}<br></a>`
    });
    memberCollapse.innerHTML = '';
    members.forEach((member) => {
        console.log(member);
        memberCollapse.innerHTML += `<a onclick="textareaChat.value += '<@${member.userID}> '">@${member.displayName}<br></a>`
    })
}

async function fetchMessages() {
    let channelID = selectChannel.value;
    let messages = (await JSON.get(`/api/channels/${channelID}/fetch`)).reverse();
    lastMessageAuthorID = 0;
    for (const message of messages) {
        divChat.innerHTML += `<div class="message" id="${message.id}">${await createMessage(message)}</div>`;
        await autoScroll()
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetchGuilds()
});
selectGuild.addEventListener('change', async () => {
    await fetchChannels()
});
selectChannel.addEventListener('change', async () => {
    divChat.innerHTML = "";
    await fetchMessages()
});
socket.on('discordMessage', async (message) => {
    if (message.channelID === selectChannel.value) divChat.innerHTML += `<div class="message" id="${message.id}">${await createMessage(message)}</div>`;
    if (checkAutoScroll.checked) autoScroll()
})
    .on('discordMessageUpdate', async (oldMessage, newMessage) => {
        if (oldMessage.channelID === selectChannel.value) await editMessage(newMessage)
    })
    .on('discordMessageDelete', async (message) => {
        if (message.channelID === selectChannel.value) await removeMessage(message)
    })
    .on('discordMessageDeleteBulk', async (messages) => {
        for (const message of messages) {
            if (message.channelID === selectChannel.value) await removeMessage(message)
        }
    });
textareaChat.addEventListener('keydown', (e) => {
    if ((!e.ctrlKey && !e.shiftKey && !e.altKey) && e.code === "Enter") {
        e.preventDefault();
        sendMessage()
    }
});
buttonSendMessage.addEventListener('click', () => {
    sendMessage()
});