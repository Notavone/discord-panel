let locale;
if (!Object.keys(locales).includes(localStorage.getItem("locale"))) {
    localStorage.setItem("locale", "en");
}
locale = localStorage.getItem("locale");
let localeFile = locales[locale];

Object.keys(locales["en"]).forEach((key) => {
    if (typeof locales["en"][key] === "string") {
        if (localeFile[key] === ("" || undefined)) localeFile[key] = locales["en"][key];
    } else if (typeof locales["en"][key] === "object") {
        if (!localeFile[key]) localeFile[key] = locales["en"][key];
    } else Object.keys(locales["en"][key]).forEach((subKey) => {
        if (localeFile[key][subKey] === ("" || undefined)) localeFile[key][subKey] = locales["en"][key][subKey];
    })

});

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

function replaceMarkdown(text, markdown, start, end, join) {
    if (text === "" || !text.includes(markdown)) return text;
    else {
        let content = text.split(markdown);
        if (content.length > 2) {
            for (let i = 0; i < content.length; i++) {
                if (i !== 0 && i % 2 !== 0) {
                    content[i] = start + content[i] + end;
                }
            }
            return content.join('');
        } else {
            return content.join(join || '');
        }

    }
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

function formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    return `${date.toLocaleDateString(localeFile.cCode)} ${date.toLocaleTimeString(localeFile.cCode)}`;
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