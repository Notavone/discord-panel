HTMLElement.prototype.clear = function () {
    let _this = this.children;
    if (_this.length === 0) return;
    for (let i = _this.length - 1; i >= 0; i--) {
        _this[i].remove()
    }
};

JSON.get = function (url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};

async function createMessage(message, overrideContent) {
    let divMessage = '';
    let authorID = message.authorID;
    if (authorID !== lastMessageAuthorID) {
        let author = await JSON.get(`/api/users/${authorID}`);
        divMessage += `<p class="message-author"><img class="avatar rounded-circle" src="${author.avatarURL}" alt=""> ${author.tag} ${new Date(message.createdTimestamp).toLocaleString()}:</p>`;
        lastMessageAuthorID = authorID
    }
    divMessage += `<p class="message-content d-inline">${overrideContent ? overrideContent : await replaceContent(message)}</p>`;
    divMessage += `<p class="message-management d-inline">`;
    divMessage += `<button class="btn fa fa-xs fa-quote-right" onclick="textareaChat.value += '<@${message.authorID}> '"></button></p>`;
    return divMessage
}

function sendMessage() {
    socket.emit('clientMessageSend', textareaChat.value, selectChannel.value);
    textareaChat.value = ''
}

async function removeMessage(message) {
    document.getElementById(message.id).innerHTML = await createMessage(message, '<s>message supprimé</s>')
}

async function editMessage(message) {
    document.getElementById(message.id).innerHTML = await createMessage(message)
}

function autoScroll() {
    divChat.scrollTop = divChat.scrollHeight
}

async function replaceContent(message) {
    let content = message.content;

    content = content.replaceAll(/<:.+?:([0-9]{18})>/gm, '<img class="emoji" src="https://cdn.discordapp.com/emojis/$1.png">');
    content = content.replaceAll(/<a:.+?:([0-9]{18})>/gm, '<img class="emoji" src="https://cdn.discordapp.com/emojis/$1.gif">');

    let channelMention = /<#([0-9]{18})>/gm;
    let channelsMatch = [...content.matchAll(channelMention)];
    for (const channelMatch of channelsMatch) {
        let channelName = await JSON.get(`/api/channels/${channelMatch[1]}?query=name`);
        content = content = content.split(channelMatch[0]).join(`#${channelName}`)
    }

    let rolesMention = /<@&([0-9]{18})>/gm;
    let rolesMatch = [...content.matchAll(rolesMention)];
    for (const roleMatch of rolesMatch) {
        let roleName = await JSON.get(`/api/roles/${message.guildID}/${roleMatch[1]}?query=name`);
        content = content.split(roleMatch[0]).join(`@${roleName}`)
    }

    let usersMention = /<@(!)?([0-9]{18})>/gm;
    let usersMatch = [...content.matchAll(usersMention)];
    for (const userMatch of usersMatch) {
        let username = await JSON.get(`/api/users/${userMatch[2]}?query=username`);
        content = content.split(userMatch[0]).join(`@${username}`)
    }

    return content
}