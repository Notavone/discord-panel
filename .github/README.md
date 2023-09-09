# Discord-panel
![許可證](https://img.shields.io/github/license/notavone/discord-panel.svg?style=for-the-badge)
![Codacy 分數](https://img.shields.io/codacy/grade/d499e4a1863349ffb7366f6b9970082f.svg?style=for-the-badge)
![倉庫大小](https://img.shields.io/github/repo-size/notavone/discord-panel.svg?style=for-the-badge)
![分叉](https://img.shields.io/github/stars/notavone/discord-panel?style=for-the-badge)

## 更新日誌

### 版本 1.3.11

* 我真的不記得了！

### 版本 1.3.10

* 現在使用 fontawesome
* **新增** 一些函數的文件
* **新增** 文檔

### 版本 1.3.9

* **修復** jQuery 不起作用

### 版本 1.3.8

* **修復** 太多語言時語言未顯示
* **新增** 意大利語翻譯由 Pyrox 和 Antonio Sarro
* **新增** 泰語翻譯由 Vatunyoo Suwannapisit

### 版本 1.3.7

* **修復** locale.js 中的重複
* **重構** 代碼

### 版本 1.3.6

* **新增** 安裝指南

### 版本 1.3.5

* **新增** 新手的翻譯指南
* **新增** 新手的貢獻指南
* **新增** 波蘭語翻譯由 ziomciopoziomcio
* **新增** 捷克語翻譯由 ziomciopoziomcio
* **新增** 斯洛伐克語翻譯由 ziomciopoziomcio

### 版本 1.3.4

* **新增** 由 Payz123 提供的烏克蘭語翻譯
* **更新** 貢獻者

### 版本 1.3.3

* **新增** 俄語翻譯由 Koteich-dev

### 版本 1.3.2

* **新增** 頁面底部的原始庫連結
* **新增** 對嵌入的支持，仍在測試中（主要在 Twitter 嵌入上進行了測試，請參見 [此問題](https://github.com/Notavone/discord-panel/issues/16)）
* **替換** 標題 `p` 標籤為實際標題 `h` 標籤
* **切換回** discord.12.1.1，因為主要和穩定版本存在跨源問題
* **刪除** 切換能見度函數，以在 jQuery 中使用預製函數替換
* **修復** Firefox 上滑鼠滾輪事件不起作用

### 版本 1.3.1

* **新增** 代碼塊的 Markdown 格式
* **新增** 提及替換
* **新增** 嵌入支持（正在進行中）
* **更新** 附件，直接發送圖像、音頻和視頻

### 版本 1.3.0

* **更新** 區域代碼，以在缺少翻譯的情況下自動切換到英語
* **更新** `contentReplacement()` 函數，也替換 Markdown
* **更新** `deleteMessage()` 和 `editMessage()` 以使用 jQuery 選擇器
* **更新** 滑鼠滾輪綁定代碼
* **新增** 一個將任何時間戳格式化為本地時間戳的函數（`formatTimestamp(dateLike)`）
* **新增** 由 LevantHAN 提供的荷蘭語翻譯
* **新增** 由 LevantHAN 提供的土耳其語翻譯
* **刪除** `deleteMessage()` 和 `editMessage()`，將代碼移至相應的 Discord 事件中

## 有何特別之處？ 💎

* ⌛ **簡單安裝：** 克隆存儲庫，解壓縮並打開[面板](../index.html)。
* 🔒 **安全性：** 您的機器人令牌存儲在本地，不會被竊取。
* 📌 **用戶友好：** 直觀的設計，不要花費數小時來弄清楚如何執行操作。
* 👀 **開源：** 你有一個想法嗎？只需拿起代碼並構建一些東西！
* 🌍 **全球範圍：** 你可以協助翻譯成你的語言！

## 安裝

1. 下載最新的[發行版](https://github.com/Notavone/discord-panel/releases)
2. 使用 WinRAR、7zip、WinZip 等解壓縮它
3. 轉到[Discord 開發者門戶](https://discord.com/developers/applications)並獲取您的機器人令牌
4. 打開[index.html](../index.html)
5. 粘貼您的令牌，單擊<kbd>確定</kbd>或按<kbd>回車</kbd>
6. 完成！

## 如何貢獻

請參閱 [CONTRIBUTION.md](CONTRIBUTION.md)

## 如何

翻譯

請參閱 [TRANSLATION.md](TRANSLATION.md)

## 使用工具 🔧

* [discord.js](https://github.com/discordjs/discord.js/tree/webpack)
* [jQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)

## 貢獻者 📝

### 翻譯 🌐

| 作者                                                    | 語言                    |
| ------------------------------------------------------- | ----------------------- |
| [LeventHAN](https://github.com/leventhan)               | 荷蘭語，土耳其語          |
| [Koteich_dev](https://github.com/Koteich-dev)           | 俄語                    |
| [Payz123](https://github.com/Payz123)                   | 烏克蘭語，俄語            |
| [ziomciopoziomcio](https://github.com/ziomciopoziomcio) | 波蘭語，捷克語，斯洛伐克語  |
| [LeafyWrath](https://github.com/LeafyWrath)             | 斯洛伐克語                |
| [Kulisidi](https://github.com/Kulisidi)                 | 俄語，烏克蘭語            |
| [roxxel](https://github.com/roxxel)                     | 烏克蘭語                |
| [tuxlabore](https://github.com/tuxlabore)               | 烏克蘭語                |
| [vlfz](https://github.com/vlfz)                         | 俄語                    |
| [Pyrox](https://github.com/Pyr0x1)                      | 意大利語                |
| [Vatunyoo Suwannapisit](https://github.com/kerlos)      | 泰語                    |
| [Antonio Sarro](https://github.com/asarro99)            | 意大利語                |

### 其他 👍

| 作者                                              |
| ----------------------------------------------------|
| [SincerelyFaust](https://github.com/SincerelyFaust) |

## 版權和許可證

版權所有 © 2019-2020 [Nøtavøne <notavone@gmail.com>](https://github.com/notavone)

該項目使用 [GNU](https://github.com/Notavone/discord-panel/blob/master/.github/LICENSE) 許可證許可

***
