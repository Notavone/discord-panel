$(document).ready(() => {

    /*///////////////////////////////////////////
                    TOKEN
    //////////////////////////////////////////*/

    var token;
    if (!localStorage.getItem("token") || localStorage.getItem("token") === "" || localStorage.getItem("token") === null) {
        token = prompt("Please enter your discord bot token", "");
        localStorage.setItem("token", token);
    }
    token = localStorage.getItem("token");

    const client = new Discord.Client();
    client.login(token).catch(() => {
        alert("No token provided or token is invalid");
    });

    /*///////////////////////////////////////////
                    DISCORD EVENTS
    //////////////////////////////////////////*/

    client.on("message", (message) => {
        if (message.channel.type !== "text") {
            if ($("#guilds").val() === "DM") {
                updateChannel();
            }
        } else {
            if (!message.author.bot) {
                $("#lastMessages").html($("#lastMessages").html() + `<br>[<b>#${escapeHtml(message.channel.name)} | ${escapeHtml(message.author.tag)}]</b> ${escapeHtml(message.content)}`);
            }
            localStorage.setItem("lastMessages", $("#lastMessages").html());

            if (message.channel.id === $("#channels").val()) {
                updateChannel();
            }
        }
    });

    client.on("ready", () => {
        $("#lastMessages").html(getSavedValue("lastMessages"));
        fetchGuilds();
    });

    client.on("messageDelete", (message) => {
        if (message.channel.id === $("#channels").val()) {
            updateChannel();
        } else if ($("#guilds").val() === "DM" && message.author.id === $("#channels").val()) {
            updateChannel();
        }
    });

    client.on("messageUpdate", (oldMessage, newMessage) => {
        if (oldMessage.channel.id === $("#channels").val()) {
            updateChannel();
        } else if ($("#guilds").val() === "DM" && oldMessage.author.id === $("#channels").val()) {
            updateChannel();
        }
    });

    client.on("guildCreate", (guild) => {
        fetchGuilds();
    });

    client.on("guildDelete", (guild) => {
        fetchGuilds();
    });

    client.on("guildMemberAdd", (member) => {
        fetchGuilds();
    });

    client.on("guildMemberRemove", (member) => {
        fetchGuilds();
    });

    /*///////////////////////////////////////////
                    DOCUMENT EVENTS
    //////////////////////////////////////////*/

    $(document).on("change", "#guilds", () => {
        updtateGuild();
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
        } else {
            return;
        }
    });

    $("#send").click(() => {
        sendMessage();
    });

    $("#delLast").click(() => {
        if (client.user.lastMessage === null) {
            $("#delLast").html("<i class='fas fa-times'></i> Delete Last Message [ERROR]");
            setTimeout(() => {
                $("#delLast").html("<i class='far fa-calendar-times'></i> Delete Last Message");
            }, 2000);
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

    $("#clearChat").click(() => {
        localStorage.setItem("lastMessages", "");
        $("#lastMessages").empty();
    });

    $("#leaveGuild").click(() => {
        if ($("#guilds").val() !== "DM") {
            if (window.confirm("Leave this guild ?")) {
                client.guilds.find((guild) => guild.id === $("#guilds").val()).leave();
            }
        } else return;
    });

    $("#invite").click(() => {
        if ($("#guilds").val() !== "DM") {
            client.channels.find((channel) => channel.id === $("#channels").val()).createInvite().then((invite) => {
                alert(`discord.gg/${invite.code}`);
            }).catch((err) => {
                $("#invite").html("<i class='fas fa-times'></i> Invite [ERROR : MISSING PERMISSIONS]");
                setTimeout(() => {
                    $("#invite").html("<i class='far fa-envelope'></i> Invite");
                }, 2000);
            });
        } else {
            $("#invite").html("<i class='fas fa-times'></i> Invite [ERROR : DM]");
            setTimeout(() => {
                $("#invite").html("<i class='far fa-envelope'></i> Invite");
            }, 2000);
        }

    });

    /*///////////////////////////////////////////
                    KEYUP EVENTS
    //////////////////////////////////////////*/

    $("#toSend").keyup((event) => {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            event.preventDefault();
            $("#send").click();
        }
        event.stopPropagation();
    });

    /*///////////////////////////////////////////
                    AUTO-SCROLL
    //////////////////////////////////////////*/

    $("#lastMessages").bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk1")[0].checked = false;
        } else if ($("#lastMessages")[0].scrollHeight - 700 < $("#lastMessages").scrollTop()) {
            $("#chk1")[0].checked = true;
        }
    });

    $("#chat").bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk2")[0].checked = false;
        } else if ($("#chat")[0].scrollHeight - 700 < $("#chat").scrollTop()) {
            $("#chk2")[0].checked = true;
        }
    });

    $("#btnrRefreshChat").click(() => {
        $("#btnrRefreshChat").html("<i class='fas fa-sync fa-spin'></i> Refresh Chat");
        updateChannel();
        setTimeout(() => {
            $("#btnrRefreshChat").html("<i class='fas fa-sync-alt'></i> Refresh Chat");
        }, 2000);

    });

    setInterval(() => {
        scrollAnim("#chk1", "#lastMessages", 1000);
        scrollAnim("#chk2", "#chat", 250);
    }, 1000);

    /*///////////////////////////////////////////
                    FUNCTIONS
    //////////////////////////////////////////*/

    function fetchGuilds() {
        $("#channels").children("option").remove();
        $("#guilds").children("option").remove();

        client.guilds.forEach((guild) => {
            $("#guilds").append(`<option value="${guild.id}">${escapeHtml(guild.name)}</option>`);
        });
        $("#guilds").append("<option value='DM'>[DM]</option>");

        setTimeout(() => {
            updtateGuild();
        }, 250);
    }

    function updtateGuild() {
        let usersArray = [];
        let guildEmojis = [];
        let guild;

        $("#channels").children("option").remove();

        switch ($("#guilds").val()) {
            case "DM":
                client.users.forEach((user) => {
                    if (!user.bot) {
                        usersArray.push(`${escapeHtml(user.username.toLowerCase())}    ||sortedbyønlyøne||    ${user.id}    ||sortedbyønlyøne||    ${escapeHtml(user.username)}`);
                    }
                });
                usersArray.sort();
                for (let i = 0; i < usersArray.length; i++) {
                    usersArray[i] = usersArray[i].split("    ||sortedbyønlyøne||    ");
                    $("#channels").append(`<option value="${usersArray[i][1]}">${escapeHtml(usersArray[i][2])} (${usersArray[i][1]})</option>`);
                }
                break;

            default:
                guild = client.guilds.find((g) => g.id === $("#guilds").val());

                guild.emojis.forEach((emoji) => {
                    if (emoji.animated) {
                        guildEmojis.push(`<img class="emojiImg" src="${emoji.url}" onclick="addText('<a:${emoji.identifier}>')">`);
                    } else {
                        guildEmojis.push(`<img class="emojiImg" src="${emoji.url}" onclick="addText('<:${emoji.identifier}>')">`);
                    }
                });

                guild.channels.filter((chan) => chan.type === "text").forEach((channel) => {
                    if (channel.permissionsFor(guild.me).has("VIEW_CHANNEL")) {
                        $("#channels").append(`<option value="${channel.id}">${escapeHtml(channel.name)}</option>`);
                    }
                });

                $("#guildName").html(`<img src="${guild.iconURL || "./img/pp_discord.png"}" class="avatarIMG"> ${escapeHtml(guild.name)}`);
                $("#guildInfo").html(`
Owner: ${guild.owner.user.tag} <button value=" <@!${guild.owner.user.id}>" class="mini" onclick="addText(this.value)"> <i class="fas fa-at"></i></button><br>
Members : ${guild.members.size}<br>
Channels (voice) : ${guild.channels.filter((chan) => chan.type === "voice").size}<br>
Channels (text) : ${guild.channels.filter((chan) => chan.type === "text").size}<br><br>

<button onclick="toggleVisibility('#guildRoles')">Roles</button>
<div id="guildRoles" style="display:none; opacity: 0;">${guild.roles.map((role) => `${escapeHtml(role.name)} (${role.id})`).join("<br>")}</div>

<button onclick="toggleVisibility('#guildChannels')">Channels</button>
<div id="guildChannels" style="display:none; opacity: 0;">${guild.channels.map((channels) => `${escapeHtml(channels.name)} (${channels.id})`).join("<br>")}</div>

<button onclick="toggleVisibility('#guildEmojis')">Emojis</button>
<div id="guildEmojis" style="display:none; opacity: 0;">${guildEmojis.join(" ")}</div>
`);

                break;
        }

        setTimeout(() => {
            updateChannel();
        }, 250);
    }

    function updateChannel() {
        let channel;
        let user;
        let msgArray = [];
        let html;
        let date;
        let timestamp;

        $("#chat").empty();

        setTimeout(() => {
            switch ($("#guilds").val()) {
                case "DM":
                    user = client.users.find((user) => user.id === $("#channels").val());
                    channel = client.channels.find((channel) => channel.type === "dm" && channel.recipient.id === user.id);

                    $("#guildName").html(`<img src="${user.avatarURL || "./img/pp_discord.png"}" class="avatarIMG"> ${escapeHtml(user.username)}`);
                    $("#guildInfo").html(`User ID : (${user.id}) <button class="mini" value="<@!${user.id}>" onclick="addText(this.value)"> <i class="fas fa-at"></i> </button>`);

                    $("#channelNameLabel").text(`Chat [${user.username}]`);
                    $("#channelName").html(`<img src="https://static.thenounproject.com/png/332789-200.png" class="fasIMG invert"> #${escapeHtml(user.username)}`);

                    if (channel !== null) {
                        channel.fetchMessages().then((messages) => {
                            msgArray = Array.from(messages).reverse();
                            msgArray.forEach((msg) => {
                                date = new Date(msg[1].createdAt);
                                timestamp = `${leadingZero(date.getDate())}/${leadingZero(date.getMonth() + 1)}/${date.getFullYear()} ${leadingZero(date.getHours() + 1)}:${leadingZero(date.getMinutes())}`;
                                html = `<br><b>${escapeHtml(msg[1].author.username)} [${timestamp}] <button class="mini" value="<@!${msg[1].author.id}>" onclick="addText(this.value)"> <i class="fas fa-at"></i> </button></b> ${escapeHtml(msg[1].content)}`;
                                $("#chat").html($("#chat").html() + html);
                            });
                        }).catch((err) => {
                            return;
                        });
                    }
                    break;

                default:
                    channel = client.channels.find((c) => c.id === $("#channels").val());

                    $("#channelNameLabel").text(`Chat [${channel.name}]`);
                    $("#channelName").html(`<img src="https://static.thenounproject.com/png/332789-200.png" class="fasIMG invert"> #${escapeHtml(channel.name)}`);

                    channel.fetchMessages().then((messages) => {
                        msgArray = Array.from(messages).reverse();
                        msgArray.forEach((msg) => {
                            date = new Date(msg[1].createdAt);
                            timestamp = `${leadingZero(date.getDate())}/${leadingZero(date.getMonth() + 1)}/${date.getFullYear()} ${leadingZero(date.getHours() + 1)}:${leadingZero(date.getMinutes())}`;
                            html = `<br><b>${escapeHtml(msg[1].author.username)} [${timestamp}] <button class="mini" value="<@!${msg[1].author.id}>" onclick="addText(this.value)"> <i class="fas fa-at"></i> </button></b> ${escapeHtml(msg[1].content)}`;
                            $("#chat").html($("#chat").html() + html);
                        });
                    }).catch((err) => {
                        return;
                    });
                    break;
            }
        }, 500);
    }

    function sendMessage() {
        if ($("#toSend").val() === "") {
            $("#send").html("<i class='fas fa-times'></i> Send [ERROR : EMPTY MESSAGE]");
            setTimeout(() => {
                $("#send").html("<i class='fas fa-share-square'></i> Send");
            }, 2000);
        } else {
            if ($("#guilds").val() === "DM") {
                var user = client.users.find((user) => user.id === $("#channels").val());
                user.send($("#toSend").val());
            } else {
                client.channels.find((channel) => channel.id === $("#channels").val()).send($("#toSend").val());
            }
            $("#toSend").val("");
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
});