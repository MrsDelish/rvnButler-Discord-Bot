# Bot for [RVN's Discord](https://discord.gg/BmwqstP)

(This README will be updated along with bot updates)

<h3>
<details style="font-size=30px;"><summary><u>Features:</u></summary>

* Hash bot displays current network Raven Netowrk Stats.

   * Responds to `!hash`

* Balance bot Displays balance of supplied Raven Address

   * Responds to `!balance ADDRESS`

* Pools bot displays pools on the raven network

   * Responds to `!pools`

* status bot displays if url is up or down.
   
   * Responds to `!status <URL> <PORT>`

* Purge Bot deletes X amount of messages.

   * (moderator only) Responds to `!purge 5`

* Welcome bot sends Direct Message when new users join,

   * (moderator only) Responds to `!welcome @USERNAME`

* Role setter bot allows users to set specific roles for themselves

   * (specified in the config!)

   * Responds to `!roles`, `!addrole ROLE`, `!delrole ROLE`

* helpful commands bot displays helpful commands you can use.

   * (set in the commands.json)

   * Responds to `!helpcommands`

* Dynamic plugin loading with permission support.

</details>
</h3>

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
