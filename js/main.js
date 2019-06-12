function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getSavedValue(v) {
    if (localStorage.getItem(v) === null) {
        return "";
    }
    return localStorage.getItem(v);
}

function leadingZero(number) {
    if (Number(number) < 10) {
        number = "0" + number;
    }
    return number;
}

function toggleVisibility(DOM) {
    if ($(DOM).css("display") === "none") {
        $(DOM).animate({
            opacity: 1,
            height: "toggle"
        }, 700);
    } else {
        $(DOM).animate({
            opacity: 0,
            height: "toggle"
        }, 500)
    }
}

function addText(value) {
    $("#toSend").val(`${$("#toSend").val()}${value} `);
}