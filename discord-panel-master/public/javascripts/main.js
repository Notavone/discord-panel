let locale;
if (!Object.keys(locales).includes(localStorage.getItem("locale"))) {
    localStorage.setItem("locale", "en");
}
locale = localStorage.getItem("locale");
let localeFile = locales[locale];

Object.keys(locales["en"]).forEach((key) => {
    if (typeof locales["en"][key] === "string") {
        if (localeFile[key] === ("" || undefined)) {
            localeFile[key] = locales["en"][key];
        }
    } else if (typeof locales["en"][key] === "object") {
        if (!localeFile[key]) {
            localeFile[key] = locales["en"][key];
        }
    } else {
        Object.keys(locales["en"][key]).forEach((subKey) => {
            if (localeFile[key][subKey] === ("" || undefined)) {
                localeFile[key][subKey] = locales["en"][key][subKey];
            }
        });
    }

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

/**
 * Replaces markdown from discord to html tags
 *
 * @param text      input text
 * @param markdown  type of markdown
 * @param start     opening html tag
 * @param end       closing html tag
 * @param join      text used to join if there is no need to replace
 * @returns {string|*}
 */
function replaceMarkdown(text, markdown, start, end, join) {
    if (text === "" || !text.includes(markdown)) {
        return text;
    } else {
        let content = text.split(markdown);
        if (content.length > 2) {
            for (let i = 0; i < content.length; i++) {
                if (i !== 0 && i % 2 !== 0 && content[i] !== "") {
                    content[i] = start + content[i] + end;
                } else if (i !== 0 && i % 2 !== 0 && content[i] === "") {
                    content[i] = join + join;
                }
            }
            return content.join("");
        } else {
            return content.join(join);
        }

    }
}

/**
 * Transforms text url into an html images
 *
 * @param element
 * @returns {string}
 */
function embedLinks(element) {
    let html = "<div>";
    if (element.iconURL) {
        html += `<a href="${element.iconURL}" target="_blank"><img class="avatarIMG" src="${element.iconURL}" alt=""></a>`;
    }
    if (element.url) {
        html += `<a href="${element.url}">${element.name || element.text}</a>`;
    } else {
        html += element.name || element.text;
    }
    html += "</div>";
    return html;
}

/**
 * Replace text from discord into human readable text
 *
 * @param content
 * @param links
 * @returns {string|*}
 */
function contentReplacement(content, links) {
    // noinspection HtmlUnknownTarget
    content = escapeHtml(content)
        .replace(/\n/g, "<br>")
        .replace(/(&lt;a:(.*?):(\d{18})&gt;)/g, `<img title="\$2" alt="" class="smallEmojiImg" src="https://cdn.discordapp.com/emojis/\$3" onclick="addText('\$1')">`)
        .replace(/(&lt;:(.*?):(\d{18})&gt;)/g, `<img title="\$2" alt="" class="smallEmojiImg" src="https://cdn.discordapp.com/emojis/\$3" onclick="addText('\$1')">`)
        .replace(/\[(.*)]\((.*)\)/g, `<a href="\$2" target="_blank">\$1</a>`);

    [...content.matchAll(/&lt;@(!|)(\d{18})&gt;/g)].forEach((match) => {
        let user = client.users.cache.find((user) => user.id === match[2]);
        if (user) {
            content = content.replace(match[0], `@${user.username}`);
        }
    });

    if (links && links.length > 0) {
        [...new Set(links)].forEach((link) => {
            content = content.replace(link, `<a href="${link}" target="_blank">${link}</a>`);
        });
    }

    content = replaceMarkdown(content, "***", "<b><em>", "</em></b>", "***");
    content = replaceMarkdown(content, "**", "<b>", "</b>", "&ast;&ast;");
    content = replaceMarkdown(content, "*", "<em>", "</em>", "&ast;");
    content = replaceMarkdown(content, "__", "<u>", "</u>", "&lowbar;&lowbar;");
    content = replaceMarkdown(content, "~~", "<s>", "</s>", "&tilde;&tilde;");
    content = replaceMarkdown(content, "```", "<div class='codeBlock'>", "</div>", "\`\`\`");
    content = replaceMarkdown(content, "`", "<div class='code'>", "</div>", "&grave;");
    return content;
}

function addText(value) {
    let toSend = $("#toSend");
    toSend.html(`${toSend.html() + escapeHtml(value)} `);
}

function format(command, value) {
    document.execCommand(command, false, value);
}

/**
 * Finds a message and deletes it
 * @param id discord message id
 */
function delMsg(id) {
    let guilds = $("#guilds");
    let channels = $("#channels");
    let channel;

    if (guilds.val() === 'DM') {
        channel = client.channels.cache.find((channel) => channel.type === "dm" && channel.recipient.id === channels.val());
    } else {
        let guild = client.guilds.cache.find((g) => g.id === guilds.val());
        channel = guild.channels.cache.find((c) => c.id === channels.val());
    }
    let message = channel.messages.cache.find((m) => m.id === id);

    if (!message.deletable) {
        return;
    }

    message.delete().catch((e) => {
        console.log(e);
    });
}

/**
 * Generate a new timestamp with a format based on the actual language you're using
 *
 * @param timestamp
 * @returns {string}
 */
function formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    return `${date.toLocaleDateString(localeFile.cCode)} ${date.toLocaleTimeString(localeFile.cCode)}`;
}

/**
 * Temporarily change the innerText of an element with another text
 *
 * @param HTMLElement
 * @param text
 * @param timeout
 */
function tempChange(HTMLElement, text, timeout) {
    let newText = `${$(HTMLElement).text().replace(text, "")} ${text}`;

    $(HTMLElement).html(newText);

    setTimeout(() => {
        $(HTMLElement).html(newText.replace(text, ""));
    }, timeout);
}

function openNav() {
    document.getElementById("languageNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("languageNav").style.height = "0%";
}