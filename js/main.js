function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function leadingZero(number) {
    if (Number(number) < 10) {
        number = '0' + number;
    }
    return number;
};

var token;
if (!localStorage.getItem('token') || localStorage.getItem('token') === '') {
    token = prompt('token', '');
    localStorage.setItem('token', token);
}
token = localStorage.getItem('token');

const client = new Discord.Client();
client.login(token);

$(document).ready(() => {

    $("#refreshToken").click(() => {
        if (window.confirm('Are you sure ?')) {
            localStorage.setItem('token', '')
            window.location.reload(true);
        } else {
            return;
        }
    });

    $("#lastMessages").html(getSavedValue("lastMessages"));

    client.on('message', (message) => {
        if (message.channel.type !== "text") {
            if ($("#guilds").val() === 'DM') {
                updateChannel(client);
            }
        } else {
            if (message.author.bot) {} else {
                $("#lastMessages").html($("#lastMessages").html() + `<br>[<b>#${escapeHtml(message.channel.name)} | ${escapeHtml(message.author.tag)}]</b> ${escapeHtml(message.content)}`);
            }
            localStorage.setItem('lastMessages', $('#lastMessages').html());

            if (message.channel.id === $("#channels").val()) {
                updateChannel(client);
            }
        }
    });

    client.on('ready', () => {
        console.log('Discord is READY!');
        fetchGuilds(client);
    });

    client.on('messageDelete', (message) => {
        if (message.channel.id === $("#channels").val()) updateChannel(client);
        if ($("#guilds").val() === 'DM' && message.author.id === $('#channels').val()) updateChannel(client);
    });

    client.on('messageUpdate', (oldMessage, newMessage) => {
        if (oldMessage.channel.id === $("#channels").val()) updateChannel(client);
        if ($("#guilds").val() === 'DM' && oldMessage.author.id === $('#channels').val()) updateChannel(client);
    });

    client.on('guildCreate', (guild) => {
        fetchGuilds(client);
    });

    client.on('guildDelete', (guild) => {
        fetchGuilds(client);
    });

    client.on('guildMemberAdd', (member) => {
        fetchGuilds(client);
    });

    client.on('guildMemberRemove', (member) => {
        fetchGuilds(client);
    });

    $(document).on('change', '#guilds', () => {
        updtateGuild(client);
    });

    $(document).on('change', '#channels', () => {
        updateChannel(client);
    });

    $("#send").click(() => {
        sendMessage(client);
    });

    $('#toSend').keyup((event) => {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            $('#send').click();
        }
        event.stopPropagation();
    });

    $("#delLast").click(() => {
        if (client.user.lastMessage === null) {
            $("#delLast").html(`<i class="fas fa-times"></i> Delete Last Message [ERROR]`)
            setTimeout(function () {
                $("#delLast").html(`<i class="far fa-calendar-times"></i> Delete Last Message`);
            }, 2000);
            return;
        } else {
            try {
                client.user.lastMessage.delete();
                updateChannel(client);
            } catch (error) {
                return;
            }
        }
    });

    $('#clearChat').click(() => {
        localStorage.setItem('lastMessages', "");
        $('#lastMessages').html('');
    });

    $('#leaveGuild').click(() => {
        if ($("#guilds").val() !== 'DM') {
            if (window.confirm("Leave this guild ?")) {
                client.guilds.find((guild) => guild.id === $('#guilds').val()).leave();
            }
        } else return;
    });

    $("#invite").click(() => {
        if ($("#guilds").val() !== 'DM') {
            client.channels.find((channel) => channel.id === $("#channels").val()).createInvite().then((invite) => {
                alert(invite.code);
            });
        } else {
            $("#invite").html(`<i class="fas fa-times"></i> Invite [ERROR]`)
            setTimeout(function () {
                $("#invite").html(`<i class="far fa-envelope"></i> Invite`);
            }, 2000);
            return;
        }

    });

    $('#lastMessages').bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk1")[0].checked = false;
        } else if ($('#lastMessages')[0].scrollHeight - 700 < $("#lastMessages").scrollTop()) {
            $("#chk1")[0].checked = true;
        }
    });

    $('#chat').bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk2")[0].checked = false;
        } else if ($('#chat')[0].scrollHeight - 700 < $("#chat").scrollTop()) {
            $("#chk2")[0].checked = true;
        }
    });

    $('#btnrRefreshChat').click(() => {
        $("#btnrRefreshChat").html(`<i class="fas fa-sync fa-spin"></i> Refresh Chat`);
        updateChannel(client);
        setTimeout(function () {
            $("#btnrRefreshChat").html(`<i class="fas fa-sync-alt"></i> Refresh Chat`);
        }, 2000);

    });

    setInterval(() => {
        if (document.querySelector('#chk1').checked) {
            if (document.querySelector('#chk3').checked) {
                $("#lastMessages").animate({
                    scrollTop: $("#lastMessages")[0].scrollHeight - $("#lastMessages").height()
                }, 1000);
            } else {
                $("#lastMessages").scrollTop($("#lastMessages")[0].scrollHeight - $("#lastMessages").height());
            }
        }

        if (document.querySelector('#chk2').checked) {
            if (document.querySelector('#chk3').checked) {
                $("#chat").animate({
                    scrollTop: $("#chat")[0].scrollHeight - $("#chat").height()
                }, 250);
            } else {
                $("#chat").scrollTop($("#chat")[0].scrollHeight - $("#chat").height());
            }
        }
    }, 1000);
});

function getSavedValue(v) {
    if (localStorage.getItem(v) === null) {
        return "";
    }
    return localStorage.getItem(v);
}

function fetchGuilds(client) {
    $('#channels').children('option').remove();
    $('#guilds').children('option').remove();

    client.guilds.forEach((guild) => {
        $("#guilds").append(`<option value="${guild.id}">${escapeHtml(guild.name)}</option>`);
    });
    $("#guilds").append(`<option value="DM">[DM]</option>`);

    setTimeout(() => {
        updtateGuild(client);
    }, 250);
}

function updtateGuild(client) {
    $('#channels').children('option').remove();

    if ($("#guilds").val() === 'DM') {

        var usersArray = [];

        client.users.forEach((user) => {
            if (!user.bot) {
                usersArray.push(`${escapeHtml(user.username.toLowerCase())}    ||sortedbyønlyøne||    ${user.id}    ||sortedbyønlyøne||    ${escapeHtml(user.username)}`);
            }
        });
        usersArray.sort();
        for (let i = 0; i < usersArray.length; i++) {
            usersArray[i] = usersArray[i].split('    ||sortedbyønlyøne||    ');
            $("#channels").append(`<option value="${usersArray[i][1]}">${escapeHtml(usersArray[i][2])} (${usersArray[i][1]})</option>`);
        }
    } else {
        var guild = client.guilds.find((g) => g.id === $("#guilds").val());
        var guildEmojis = [];

        guild.emojis.forEach((emoji) => {
            if (emoji.animated) {
                guildEmojis.push(`&lt;a:${emoji.identifier}&gt; <button class='mini' value='<a:${emoji.identifier}>' onclick='addText(this.value)'>Add</button>`);
            } else guildEmojis.push(`&lt;:${emoji.identifier}&gt; <button class='mini' value='<:${emoji.identifier}>' onclick='addText(this.value)'>Add</button>`);
        });

        guild.channels.filter((chan) => chan.type === 'text').forEach((channel) => {
            if (channel.permissionsFor(guild.me).has('VIEW_CHANNEL')) {
                $("#channels").append(`<option value="${channel.id}">${escapeHtml(channel.name)}</option>`);
            }
        });

        $('#guildName').html(`<img src='${guild.iconURL||'./img/pp_discord.png'}' class='avatarIMG'> ${escapeHtml(guild.name)}`);
        $("#guildInfo").html(`
Owner: ${guild.owner.user.tag} <button value=' <@!${guild.owner.user.id}>' class='mini' onclick='addText(this.value)'> <i class="fas fa-at"></i> </button><br>
Members counter : ${guild.members.size}<br>
Channels counter (voice) : ${guild.channels.filter((chan) => chan.type === 'voice').size}<br>
Channels counter (text) : ${guild.channels.filter((chan) => chan.type === 'text').size}<br><br>
Roles :<br>
${guild.roles.map((role) => `${escapeHtml(role.name)} (${role.id})`).join('<br>')}<br><br>
Channels :<br>
${guild.channels.map((channels) => `${escapeHtml(channels.name)} (${channels.id})`).join('<br>')}<br><br>
Emojis :<br>
${guildEmojis.join('<br>')}`)
    }

    setTimeout(() => {
        updateChannel(client);
    }, 250);
}

function updateChannel(client) {
    var channel;
    if ($("#guilds").val() === 'DM') {
        var user = client.users.find((user) => user.id === $('#channels').val());
        channel = client.channels.find((channel) => channel.type === 'dm' && channel.recipient.id === user.id);

        $('#guildName').html(`<img src='${user.avatarURL||'./img/pp_discord.png'}' class='avatarIMG'> ${escapeHtml(user.username)}`);
        $("#guildInfo").html(`User ID : (${user.id}) <button class='mini' value='<@!${user.id}>' onclick="addText(this.value)"> <i class="fas fa-at"></i> </button>`);

        $("#channelNameLabel").text(`Chat [${user.username}]`);
        $("#channelName").html(`<img src='https://static.thenounproject.com/png/332789-200.png' class="fasIMG invert"> #${escapeHtml(user.username)}`);
    } else {
        channel = client.channels.find((c) => c.id === $("#channels").val());

        $("#channelNameLabel").text(`Chat [${channel.name}]`);
        $("#channelName").html(`<img src='https://static.thenounproject.com/png/332789-200.png' class="fasIMG invert"> #${escapeHtml(channel.name)}`);
    }
    $('#chat').html('');
    setTimeout(() => {
        try {
            channel.fetchMessages()
                .then((messages) => {
                    var msgArray = Array.from(messages).reverse();
                    var html;
                    if ($("#guilds").val() === 'DM') {
                        msgArray.forEach((msg) => {
                            var date = new Date(msg[1].createdAt);
                            var timestamp = `${leadingZero(date.getDate())}/${leadingZero(date.getMonth() + 1)}/${date.getFullYear()} ${leadingZero(date.getHours() + 1)}:${leadingZero(date.getMinutes())}`;
                            html = `<br><b>${escapeHtml(msg[1].author.username)} [${timestamp}] <button class='mini' value="<@!${msg[1].author.id}>" onclick='addText(this.value)'> <i class="fas fa-at"></i> </button></b> ${escapeHtml(msg[1].content)}`;
                            $('#chat').html($('#chat').html() + html);
                        });
                    } else {
                        msgArray.forEach((msg) => {
                            var date = new Date(msg[1].createdAt);
                            var timestamp = `${leadingZero(date.getDate())}/${leadingZero(date.getMonth() + 1)}/${date.getFullYear()} ${leadingZero(date.getHours() + 1)}:${leadingZero(date.getMinutes())}`;
                            html = `<br><b>${escapeHtml(msg[1].author.username)} [${timestamp}] <button class='mini' value="<@!${msg[1].author.id}>" onclick='addText(this.value)'> <i class="fas fa-at"></i> </button><button class='mini' value="${msg[0]}" onclick='dlt(this.value)'> <i class="fas fa-trash-alt"></i> </button></b> ${escapeHtml(msg[1].content)}`
                            $('#chat').html($('#chat').html() + html);
                        });
                    }
                });
        } catch (error) {
            return;
        }
    }, 500);
}

function sendMessage(client) {
    if ($("#toSend").val() === '') {
        $("#send").html(`<i class="fas fa-times"></i> Send [ERROR]`)
        setTimeout(function () {
            $("#send").html(`<i class="fas fa-share-square"></i> Send`);
        }, 2000);
        return alert('Cannot send empty message');
    } else {
        if ($("#guilds").val() === 'DM') {
            var user = client.users.find((user) => user.id === $('#channels').val());
            user.send($("#toSend").val());
        } else {
            client.channels.find((channel) => channel.id === $('#channels').val()).send($("#toSend").val());
        }
        $('#toSend').val('');
    }
}

function addText(value) {
    $("#toSend").val(`${$("#toSend").val()}${value} `);
}

function dlt(value) {
    if (window.confirm('Are you sure ?')) {
        client.channels.find((channel) => channel.id === $("#channels").val()).fetchMessage(value).then((msg) => msg.delete())
    }
}