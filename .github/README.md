# Discord-panel
![license](https://img.shields.io/github/license/notavone/discord-panel.svg?style=for-the-badge)
![codacy grade](https://img.shields.io/codacy/grade/d499e4a1863349ffb7366f6b9970082f.svg?style=for-the-badge)
![repo size](https://img.shields.io/github/repo-size/notavone/discord-panel.svg?style=for-the-badge)
![forks](https://img.shields.io/github/stars/notavone/discord-panel?style=for-the-badge)

## Changelog

### Version 1.3.7

*  **Fixed** a duplicate in locale.js
*  **Refactored** the code

### Version 1.3.6

*  **Added** an installation guide

### Version 1.3.5

*  **Added** a translation guide for newcomers
*  **Added** a contribution guide for newcomers
*  **New** Polish translation by ziomciopoziomcio
*  **New** Czech translation by ziomciopoziomcio
*  **New** Slovakian translation by ziomciopoziomcio

### Version 1.3.4

*  **New** Ukrainian translation by Payz123
*  **Updated** contributors

### Version 1.3.3

*  **New** Russian translation by Koteich-dev

### Version 1.3.2

*  **Added** a link to the original repo at the bottom of the page
*  **Added** support for embed, still WIP until fully tested (mainly tested on Twitter embeds, see [this issue](https://github.com/Notavone/discord-panel/issues/16))
*  **Replaced** header `p` tags by actual headers `h` tags
*  **Switched** back to discord.12.1.1 because of cross-origin issue with master and stable
*  **Removed** toggleVisibility functions to replace with a pre-made one in jQuery
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
*  **New** Dutch translation by LevantHAN
*  **New** Turkish translation by LevantHAN
*  **Removed** `deleteMessage()` & `editMessage()` and moved the code into their matching discord events

## What makes this special ? 💎

*   ⌛ **Easy installation :** clone the repository, unzip and open [the panel](../index.html).
*   🔒 **Security :** your bot token is stocked locally, no risk of it being stolen.
*   📌 **User Friendly :** intuitive design, don't spend hours figuring out how to do something.
*   👀 **Open source :** you have an idea ? Just take the code and build something out of it !
*   🌍 **Worldwide :** you can help translate in your language !

## Installation

1.  Download the latest [release](https://github.com/Notavone/discord-panel/releases)
2.  Extract it with WinRAR, 7zip, WinZip...
3.  Go to the [Discord Developer Portal](https://discord.com/developers/applications) and grab your bot token
4.  Open [index.html](../index.html)
5.  Paste your token, click <kbd>ok</kbd> or hit <kbd>enter</kbd>
6.  Voila !

## How to translate

Please refer to [CONTRIBUTION.md](CONTRIBUTION.md)

## How to contribute

Please refer to [TRANSLATION.md](TRANSLATION.md)

## Built With 🔧

*   [discord.js](https://github.com/discordjs/discord.js/tree/webpack)
*   [jQuery](https://jquery.com/)
*   [Bootstrap](https://getbootstrap.com/)

## Contributors 📝

### Translation 🌐

| Author                                                  | Language                 |
| ------------------------------------------------------- | ------------------------ |
| [LeventHAN](https://github.com/leventhan)               | Dutch, Turkish           |
| [Koteich_dev](https://github.com/Koteich-dev)           | Russian                  |
| [Payz123](https://github.com/Payz123)                   | Ukrainian, Russian       |
| [ziomciopoziomcio](https://github.com/ziomciopoziomcio) | Polish, Czech, Slovakian |
| [LeafyWrath](https://github.com/LeafyWrath)             | Slovakian                |
| [Kulisidi](https://github.com/Kulisidi)                 | Russian, Ukrainian       |
| [roxxel](https://github.com/roxxel)                     | Ukrainian                |
| [tuxlabore](https://github.com/tuxlabore)               | Ukrainian                |

## Copyrights and Licence

Copyright © 2019-2020 [Nøtavøne <notavone@gmail.com>](https://github.com/notavone)

This project is [GNU](https://github.com/Notavone/discord-panel/blob/master/.github/LICENSE) licensed

***