# Bot for [RVN's Discord](https://discord.gg/BmwqstP)

(This README will be updated along with bot updates)

## Features:
<h5>

* Hash bot displays current network Raven Netowrk Stats. Responds to `!hash`

* Purge Bot (moderator only) deletes X amount of messages. Responds to `!purge
  <X>`

* Welcome bot sends Direct Message when new users join,

  (moderator only) Responds to `!welcome <@username>`

* Dynamic plugin loading with permission support.

</h5>

## Requirements

* node > 8.0.0
* npm > 0.12.x
* yarn ( install with npm install -g yarn if not installed )

## Installation

Create a bot and get the bot's API Token:
https://discordapp.com/developers/applications/me

Edit and rename example config to default.json in /config, then cd to wunderbot directory
and run:

```
yarn install
node bot/bot.js
```

## Development

Be sure to run the command below before working on any code, this ensures
prettier goes to work and keeps code to our standard.

```
yarn install --production=false
```
