# Discord-panel
![license](https://img.shields.io/github/license/notavone/discord-panel.svg?style=for-the-badge)
![codacy grade](https://img.shields.io/codacy/grade/d499e4a1863349ffb7366f6b9970082f.svg?style=for-the-badge)
![repo size](https://img.shields.io/github/repo-size/notavone/discord-panel.svg?style=for-the-badge)
![forks](https://img.shields.io/github/stars/notavone/discord-panel?style=for-the-badge)

## Changelog

### Version 1.2.6
*   **Updated** discord.js to master
*   Language automation
*   Github things

### Version 1.2.5

*   Code cleaning
*   `updateGuild()` events will trigger `selectChannelOnReload()` to automatically select the channel you were in before the guild updated

### Version 1.2.4

*   **Added** text formatting
*   **Added** delete message buttons
*   More message type are recognised (boost, news, pin)
*   Accessing DMs will no longer throw an error
*   **Fixed** emojis not pasting correctly
*   Servers emoji now displays an image in the chat
*   Messages will no longer appear in last messages if you're viewing the channel the channel they come from
*   `Shift`+`Enter` now inserts a line break instead of sending the message

### Version 1.2.3

*   **Fixed** the workaround of [@RobinSchapendonk](https://github.com/RobinSchapendonk)
*   Deleting/updating a message should no longer refresh the chat but dynamically find and delete/update the message (guilds only)
*   Auto-scrolling is now a bit quicker to match with the speed of chat updating
*   **Added** a `border-radius` attribute to a lot of elements
*   Attachments are now recognised by their file type and displayed as such (images, documents etc..)

### Version 1.2.2

*   Changed the look of the panel
*   **Removed** unused translations

### Version 1.2.1

*   Code cleaning

### Version 1.2.0

*   **Updated** README with changelog and how to translate sections
*   **Fixed** the emoji button not appearing due to the recent changes in discord.js and how guildEmojis now works
*   **Added** a new language button to load a translation of the project (css and a bit of code by [@ziomciopoziomcio](https://github.com/ziomciopoziomcio))
*   ~~**Tried** a workaround to make the chat more readable in case of spam by [@RobinSchapendonk](https://github.com/RobinSchapendonk) but it's not currently working as intended so i'll make something later~~ ([fixed in version 1.2.3](#version-1.2.3))

## What makes this special ? 💎

*   ⌛ **Easy "installation" :** clone the repository, unzip and open [the panel](../index.html).
*   🔒 **Security :** your bot token is stocked locally, no risk of it being stolen.
*   📌 **User Friendly :** intuitive design, don't spend hours figuring out how to do something.
*   👀 **Open source :** you have an idea ? Just take the code and build something out of it !
*   🌍 **Worldwide :** you can help translate in your language !

## How to translate

COMING SOON™

## Built With 🔧

*   [discord.js](https://github.com/discordjs/discord.js/blob/webpack/discord.11.4.2.js)
*   [JQuery](https://jquery.com/)
*   [Bootstrap](https://getbootstrap.com/)

## Author 📝

| ![Nøtavøne](https://github.com/notavone.png?size=100) |
|:-----------------------------------------------------:|
| **[💻 Nøtavøne](https://github.com/notavone)**        |

## Contributors 📝

*   **None at the moment 😢**

## Copyrights and Licence

Copyright © 2019-2020 [Nøtavøne <notavone@gmail.com>](https://github.com/notavone)

This project is [GNU](https://github.com/Notavone/discord-panel/blob/master/.github/LICENSE) licensed

***