# Discord-panel
![license](https://img.shields.io/github/license/notavone/discord-panel.svg?style=for-the-badge)
![codacy grade](https://img.shields.io/codacy/grade/d499e4a1863349ffb7366f6b9970082f.svg?style=for-the-badge)
![repo size](https://img.shields.io/github/repo-size/notavone/discord-panel.svg?style=for-the-badge)
![forks](https://img.shields.io/github/stars/notavone/discord-panel?style=for-the-badge)

## Changelog

### Version 1.3.2

*  **Added** a link to the original repo at the bottom of the page
*  **Added** support for embed, still WIP until fully tested (mainly tested on Twitter embeds, see [this issue](https://github.com/Notavone/discord-panel/issues/16))
*  **Replaced** header `p` tags by actual headers `h` tags
*  **Switched** back to discord.12.1.1 because of cross-origin issue with master and stable
*  **Removed** toggleVisibility functions to replace with a pre-made one is jQuery
*  **Fixed** mouse wheel event not working on Firefox

### Version 1.3.1

*  **Added** code blocks to markdown formatting
*  **Added** mention replacement
*  **Added** embed support (WIP)
*  **Updated** attachments to directly send images, audios and videos
 
### Version 1.3.0

*  **Updated** the locale code to automatically switch to english in case of missing translations
*  **Updated** the `contentReplacement()` function to also replace markdown
*  **Updated** `deleteMessage()` & `editMessage()` to make use of jQuery selectors
*  **Updated** the mousewheel binding code
*  **New** function to format any timestamp into local timestamp (`formatTimestamp(dateLike)`)
*  **New** Dutch locale by LevantHAN
*  **New** Turkish locale by LevantHAN
*  **Removed** `deleteMessage()` & `editMessage()` and moved the code into their matching discord events

## What makes this special ? 💎

*   ⌛ **Easy "installation" :** clone the repository, unzip and open [the panel](../index.html).
*   🔒 **Security :** your bot token is stocked locally, no risk of it being stolen.
*   📌 **User Friendly :** intuitive design, don't spend hours figuring out how to do something.
*   👀 **Open source :** you have an idea ? Just take the code and build something out of it !
*   🌍 **Worldwide :** you can help translate in your language !

## How to translate

COMING SOON™

## Built With 🔧

*   [discord.js](https://github.com/discordjs/discord.js/tree/webpack)
*   [jQuery](https://jquery.com/)
*   [Bootstrap](https://getbootstrap.com/)

## Author 📝

| ![Nøtavøne](https://github.com/notavone.png?size=100) |
|:-----------------------------------------------------:|
| **[💻 Nøtavøne](https://github.com/notavone)**        |

## Contributors 📝

| ![LeventHAN](https://github.com/leventhan.png?size=100) |
|:-------------------------------------------------------:|
| **[🌐 LeventHAN](https://github.com/leventhan)**         |

## Copyrights and Licence

Copyright © 2019-2020 [Nøtavøne <notavone@gmail.com>](https://github.com/notavone)

This project is [GNU](https://github.com/Notavone/discord-panel/blob/master/.github/LICENSE) licensed

***