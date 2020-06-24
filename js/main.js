let locale;
if (!localStorage.getItem("locale") || localStorage.getItem("locale") === "" || localStorage.getItem("locale") === null) {
    localStorage.setItem("locale", "en");
}
locale = localStorage.getItem("locale");
let localeFile = locales[locale];

let token;
if (!localStorage.getItem("token") || localStorage.getItem("token") === "" || localStorage.getItem("token") === null) {
    token = prompt(localeFile.token.prompt, "");
    localStorage.setItem("token", token);
}
token = localStorage.getItem("token");

const client = new Discord.Client();
client.login(token).catch(() => {
    alert(localeFile.token.invalid);
});

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function toggleVisibilityHeight(DOM) {
    if ($(DOM).css("display") === "none") {
        $(DOM).animate({
            opacity: 1,
            height: "toggle"
        }, 1200);
    } else {
        $(DOM).animate({
            opacity: 0,
            height: "toggle"
        }, 1200);
    }
}

function toggleVisibilityWidth(DOM) {
    if ($(DOM).css("display") === "none") {
        $(DOM).animate({
            opacity: 1,
            width: "toggle"
        }, 200);
    } else {
        $(DOM).animate({
            opacity: 0,
            width: "toggle"
        }, 200);
    }
}

function addText(value) {
    let toSend = $("#toSend");
    toSend.html(`${toSend.html() + escapeHtml(value)} `);
}

function format(command, value) {
    document.execCommand(command, false, value);
}

function del(message) {
    let guilds = $("#guilds");
    let channels = $("#channels");
    if (guilds.val() === "DM") {
        let channel = client.channels.cache.find((channel) => channel.type === "dm" && channel.recipient.id === channels.val());
        channel.messages.cache.find((m) => m.id === message).delete().catch();
    } else {
        let guild = client.guilds.cache.find((g) => g.id === guilds.val());
        let channel = guild.channels.cache.find((c) => c.id === channels.val());
        channel.messages.cache.find((m) => m.id === message).delete().catch();
    }
}

function tempChange(DOM, text, time) {
    let newText = `${$(DOM).text().replace(text, "")} ${text}`;

    $(DOM).html(newText);

    setTimeout(() => {
        $(DOM).html(newText.replace(text, ""));
    }, time);
}

function openNav() {
    document.getElementById("languageNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("languageNav").style.height = "0%";
}