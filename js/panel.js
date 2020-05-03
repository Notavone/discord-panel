$(document).ready(() => {
    /*///////////////////////////////////////////
                TOKEN
    //////////////////////////////////////////*/

    let token;
    if (!localStorage.getItem("token") || localStorage.getItem("token") === "" || localStorage.getItem("token") === null) {
        token = prompt("Please enter your discord bot token", "");
        localStorage.setItem("token", token);
    }
    token = localStorage.getItem("token");

    const client = new Discord.Client();
    client.login(token).catch(() => {
        alert("No token provided or token is invalid");
    });

    const guilds = $("#guilds");
    const channels = $("#channels");
    const channelNameLabel = $("#channelNameLabel");
    const channelName = $("#channelName");
    const chat = $("#chat");
    const toSend = $("#toSend");
    const lastMessages = $("#lastMessages");

    /*///////////////////////////////////////////
                    FUNCTIONS
    //////////////////////////////////////////*/

    function updateGuild() {
        let usersArray = [];
        let guildEmojis = [];
        let guildMembers = [];
        let guild;
        let html = "";

        channels.children("option").remove();
        if (guilds.val() === "DM") {
            // includes client self user and clyde
            if (client.users.cache.size <= 2) {
                return;
            }

            client.users.cache.forEach((user) => {
                if (!user.bot) {
                    usersArray.push([escapeHtml(user.username.toLowerCase()), user.id, escapeHtml(user.tag)]);
                }
            });

            usersArray.sort();

            for (let i = 0; i < usersArray.length; i++) {
                channels.append(`<option value="${usersArray[i][1]}">${escapeHtml(usersArray[i][2])}</option>`);
            }
        } else {
            guild = client.guilds.cache.find((g) => g.id === guilds.val());

            if (guild.channels.cache.filter((chan) => chan.type === "text").size > 0) {
                guild.channels.cache.filter((chan) => chan.type === "text").forEach((channel) => {
                    if (channel.permissionsFor(guild.me).has("VIEW_CHANNEL")) {
                        channels.append(`<option value="${channel.id}">${escapeHtml(channel.name)}</option>`);
                    }
                });
            }

            $("#guildName").html(`<a href="${guild.iconURL() || "./img/icon/info.png"}" target="_blank"><img alt="" src="${guild.iconURL() || "./img/icon/info.png"}" class="avatarIMG"/></a> ${escapeHtml(guild.name)}`);

            // General informations

            html += `<br>Owner: ${guild.owner.user.tag} <button value="<@!${guild.owner.user.id}>" class="mini" onclick="addText(this.value)">@</button><br>`;
            html += `Members : ${guild.members.cache.filter((member) => !member.user.bot).size}<br>`;
            html += `Channels (voice) : ${guild.channels.cache.filter((chan) => chan.type === "voice").size}<br>`;
            html += `Channels (text) : ${guild.channels.cache.filter((chan) => chan.type === "text").size}<br><br>`;

            // Members button
            guild.members.cache.filter((member) => !member.user.bot).forEach((member) => {
                let avatarUrl = member.user.avatarURL() || `./img/discord_defaults_avatars/${member.user.discriminator % 5}.png`;
                guildMembers.push(`<a href="${avatarUrl}" target="_blank"><img alt="" style="display: inline;" class="avatarIMG" src="${avatarUrl}"/></a> ${member.user.tag} <button value="<@!${member.user.id}>" onclick="addText(this.value)" class="mini">@</button>`);
            });
            html += "<button onclick='toggleVisibilityHeight(`#guildMembers`)'>Members</button>";
            html += `<div id="guildMembers" style="display:none; opacity: 0;">${guildMembers.join("<br>")}</div>`;

            // Roles button
            html += "<button onclick='toggleVisibilityHeight(`#guildRoles`)'>Roles</button>";
            html += `<div id="guildRoles" style="display:none; opacity: 0;">${guild.roles.cache.map((role) => `${escapeHtml(role.name)} (${role.id})`).join("<br>")}</div>`;

            // Channels button
            if (guild.channels.cache.size > 0) {
                html += "<button onclick='toggleVisibilityHeight(`#guildChannels`)'>Channels</button>";
                html += `<div id="guildChannels" style="display:none; opacity: 0;">${guild.channels.cache.map((channels) => `${escapeHtml(channels.name)} (${channels.id})`).join("<br>")}</div>`;
            }

            // Emoji button
            if (guild.emojis.size > 0) {
                guild.emojis.forEach((emoji) => {
                    if (emoji.animated) {
                        guildEmojis.push(`<img alt="" class="emojiImg" src="${emoji.url}" onclick="addText('<a:${emoji.identifier}>')"/>`);
                    } else {
                        guildEmojis.push(`<img alt="" class="emojiImg" src="${emoji.url}" onclick="addText('<:${emoji.identifier}>')"/>`);
                    }
                });
                html += "<button onclick='toggleVisibilityHeight(`#guildEmojis`)'>Emojis</button>";
                html += `<div id="guildEmojis" style="display:none; opacity: 0;">${guildEmojis.join(" ")}</div>`
            }

            $("#guildInfo").html(html);
        }

        updateChannel();
    }

    function createMessage(message) {
        let userTag = escapeHtml(message[1].author.tag);
        let userId = message[1].author.id;
        let avatarUrl = message[1].author.avatarURL() || `./img/discord_defaults_avatars/${message[1].author.discriminator % 5}.png`;
        let userAvatar = `<a href="${avatarUrl}" target="_blank"><img alt="" src="${avatarUrl}" class="avatarIMG"/></a>`;
        let creationDate = new Date(message[1].createdAt);
        let timestamp = `${leadingZero(creationDate.getDate())}/${leadingZero(creationDate.getMonth() + 1)}/${creationDate.getFullYear()} ${leadingZero(creationDate.getHours() + 1)}:${leadingZero(creationDate.getMinutes())}`;
        let html;
        let attachments = "";

        Array.from(message[1].attachments).forEach((attachment) => {
            attachments += `<a href="${escapeHtml(attachment[1].url)}" target="_blank">file</a> `;
        });

        if (message[1].type === "GUILD_MEMBER_JOIN") {
            html = `${userAvatar} ${userTag} joined the server <button class="mini" value="<@!${userId}>" onclick="addText(this.value)">@</button><br>`;
        } else if (message[1].content === "") {
            html = `${userAvatar} ${userTag} sent some file(s) <button class="mini" value="<@!${userId}>" onclick="addText(this.value)">@</button><br>`;
        } else {
            html = `${userAvatar} ${userTag} <span class="font-size-mini">${timestamp}</span> <button class="mini" value="<@!${userId}>" onclick="addText(this.value)">@</button><br>${escapeHtml(message[1].content)}<br>`;
        }

        if (attachments !== "") {
            html += `Attachments : ${attachments}<br>`;
        }

        return html;
    }

    function fetchGuilds() {
        channels.children("option").remove();
        guilds.children("option").remove();

        if (client.guilds.cache.size === 0) {
            return;
        }

        client.guilds.cache.forEach((guild) => {
            guilds.append(`<option value="${guild.id}">${escapeHtml(guild.name)}</option>`);
        });
        guilds.append("<option value='DM'>[DM]</option>");

        updateGuild();
    }

    function updateChannel() {
        let channel;
        let user;

        chat.empty();
        if (guilds.val() === "DM") {
            user = client.users.cache.find((user) => user.id === channels.val());

            channel = client.channels.cache.find((channel) => channel.type === "dm" && channel.recipient.id === user.id);
            let avatarUrl = user.avatarURL() || `./img/discord_defaults_avatars/${user.discriminator % 5}.png`;
            $("#guildName").html(`<a href="${avatarUrl}" target="_blank"><img alt="" src="${avatarUrl}" class="avatarIMG"/></a> ${escapeHtml(user.username)}`);
            $("#guildInfo").html(`User ID : (${user.id}) <button class="mini" value="<@!${user.id}>" onclick="addText(this.value)">@</button>`);

            channelNameLabel.text(`Chat [${user.username}]`);
            channelName.html(`<img alt="" src="./img/icon/chat.png" class="avatarIMG"/> #${escapeHtml(user.username)}`);

            if (channel !== undefined) {
                channel.messages.fetch().then((messages) => {
                    Array.from(messages).reverse().forEach((msg) => {
                        chat.html(chat.html() + createMessage(msg));
                    });
                });
            }
        } else {
            channel = client.channels.cache.find((c) => c.id === channels.val());

            if (channel === null) return;

            channelNameLabel.text(`Chat [${channel.name}]`);
            channelName.html(`<img alt="" src="./img/icon/chat.png" class="avatarIMG"/> #${escapeHtml(channel.name)}`);
            channel.messages.fetch().then((messages) => {
                Array.from(messages).reverse().forEach((msg) => {
                    chat.html(chat.html() + createMessage(msg));
                });
            });
        }
    }

    function sendMessage() {
        let user;

        if (toSend.val() === "") {
            tempChange("#send", "[ERROR : EMPTY MESSAGE]", 2000);
        } else {
            if (guilds.val() === "DM") {
                user = client.users.cache.find((user) => user.id === channels.val());
                user.send(toSend.val());
            } else {
                client.channels.cache.find((channel) => channel.id === channels.val()).send(toSend.val()).catch(() => {
                    tempChange("#send", "[ERROR : MISSING PERMISSIONS]", 2000);
                });
            }
            toSend.val("");
        }
    }

    function scrollAnim(DOM1, DOM2, time) {
        if (document.querySelector(DOM1).checked) {
            if (document.querySelector("#chk3").checked) {
                $(DOM2).animate({
                    scrollTop: $(DOM2)[0].scrollHeight - $(DOM2).height()
                }, time);
            } else {
                $(DOM2).scrollTop($(DOM2)[0].scrollHeight - $(DOM2).height());
            }
        }
    }

    /*///////////////////////////////////////////
                    DISCORD EVENTS
    //////////////////////////////////////////*/
    client.on("message", (message) => {
        if (Number(message.channel.id) === Number(channels.val()) || Number(message.author.id) === Number(channels.val()) || Number(message.author.id) === Number(client.user.id)) {
            updateChannel();
        }
        if (message.channel.type !== "dm" && (Number(message.author.id) === Number(client.user.id) || !message.author.bot)) {
            lastMessages.html(lastMessages.html() + `<br>[<b>#${escapeHtml(message.channel.name)} | ${escapeHtml(message.author.tag)}]</b> ${escapeHtml(message.content)}`);
        } else if (message.channel.type === "dm" && !message.author.bot) {
            lastMessages.html(lastMessages.html() + `<br><b>[DM] ${escapeHtml(message.author.tag)}</b> ${escapeHtml(message.content)}`);
        }
        localStorage.setItem("lastMessages", $("#lastMessages").html());
    });

    client.on("ready", () => {
        $("#lastMessages").html(getSavedValue("lastMessages"));
        fetchGuilds();
    });

    client.on("messageDelete", (message) => {
        if (message.channel.id === channels.val()) {
            updateChannel();
        } else if (guilds.val() === "DM" && message.author.id === channels.val()) {
            updateChannel();
        }
    });

    client.on("messageUpdate", (oldMessage, newMessage) => {
        if (oldMessage.channel.id === channels.val()) {
            updateChannel();
        } else if (guilds.val() === "DM" && oldMessage.author.id === channels.val()) {
            updateChannel();
        }
    });

    client.on("guildCreate", (guild) => {
        fetchGuilds();
    });

    client.on("guildDelete", (guild) => {
        fetchGuilds();
    });

    client.on("guildUpdate", (oldGuild) => {
        if (oldGuild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("guildMemberAdd", (member) => {
        if (member.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("guildMemberRemove", (member) => {
        if (member.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("channelCreate", (channel) => {
        if (guilds.val() === "[DM]" || channel.type === "dm") return;
        if (channel.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("channelDelete", (channel) => {
        if (channel.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("channelUpdate", (oldChannel) => {
        if (oldChannel.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("emojiCreate", (emoji) => {
        if (emoji.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("emojiDelete", (emoji) => {
        if (emoji.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    client.on("emojiUpdate", (oldEmoji) => {
        if (oldEmoji.guild.id === guilds.val()) {
            updateGuild();
        }
    });

    /*///////////////////////////////////////////
                    DOCUMENT EVENTS
    //////////////////////////////////////////*/

    $(document).on("change", "#guilds", () => {
        updateGuild();
    });

    $(document).on("change", "#channels", () => {
        updateChannel();
    });

    /*///////////////////////////////////////////
                    BUTTONS EVENTS
    //////////////////////////////////////////*/

    $("#refreshToken").click(() => {
        if (window.confirm("Are you sure ?")) {
            localStorage.setItem("token", "");
            window.location.reload(true);
        }
    });

    $("#send").click(() => {
        sendMessage();
    });

    /* TODO Fix code apparently not working in this version of discord.js
    $("#delLast").click(() => {
        console.log(client.user);
        if (client.user.lastMessage === null) {
            tempChange("#delLast", "[ERROR]", 2000);
            return;
        } else {
            try {
                client.user.lastMessage.delete();
                updateChannel();
            } catch (error) {
                return;
            }
        }
    });
    */


    $("#clearChat").click(() => {
        localStorage.setItem("lastMessages", "");
        $("#lastMessages").empty();
    });

    $("#leaveGuild").click(() => {
        if (guilds.val() !== "DM") {
            if (window.confirm("Leave this guild ?")) {
                client.guilds.cache.find((guild) => guild.id === guilds.val()).leave().catch(() => {
                    tempChange("#leaveGuild", "[ERROR]", 2000);
                });
            }
        }
    });

    $("#invite").click(() => {
        if (guilds.val() !== "DM") {
            client.channels.cache.find((channel) => channel.id === channels.val()).createInvite().then((invite) => {
                alert(`discord.gg/${invite.code}`);
            }).catch(() => {
                tempChange("#invite", "[ERROR : MISSING PERMISSIONS]", 2000);
            });
        } else {
            tempChange("#invite", "[ERROR : DM]", 2000);
        }

    });

    /*///////////////////////////////////////////
                    KEYUP EVENTS
    //////////////////////////////////////////*/

    toSend.keyup((event) => {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            event.preventDefault();
            $("#send").click();
        }
        event.stopPropagation();
    });

    /*///////////////////////////////////////////
                    AUTO-SCROLL
    //////////////////////////////////////////*/

    lastMessages.bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk1")[0].checked = false;
        } else if ($("#lastMessages")[0].scrollHeight - 700 < $("#lastMessages").scrollTop()) {
            $("#chk1")[0].checked = true;
        }
    });

    chat.bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk2")[0].checked = false;
        } else if ($("#chat")[0].scrollHeight - 700 < $("#chat").scrollTop()) {
            $("#chk2")[0].checked = true;
        }
    });

    $("#btnrRefreshChat").click(() => {
        updateChannel();
    });

    setInterval(() => {
        scrollAnim("#chk1", "#lastMessages", 1000);
        scrollAnim("#chk2", "#chat", 250);
    }, 1000);
});