let config = require("config");
let hasPoolsBotChannels = require("../helpers.js").hasPoolsBotChannels;

exports.commands = [
  "pools" // command name that will be used for next lines of code below
];

exports.pools = {
  usage: "",
  description: "Pools",
  process: function(bot, msg, suffix) {
    if (!hasPoolsBotChannels(msg)) {
      msg.channel
        .send("can't use this command here")
        .then(message => message.delete(3000));
    } else {
      const embed = {
        description:
          "**[threeeyed](http://pool.threeeyed.info/)**\n  STRATUM-URL: stratum+tcp://pool.threeeyed.info:\n  STRATUM-PORT: 3333\n\n**[rvnpool](https://rvnpool.com/)**\n  STRATUM-URL: stratum+tcp://rvnpool.com\n  STRATUM-PORT: 3333\n\n**[CryptopoolParty](https://cryptopool.party/)**\n  STRATUM-URL: stratum+tcp://cryptopool.party\n  STRATUM-PORT: 3636\n  Extra Config: -p c=RVN\n\n**[hash4life](https://hash4.life/)**\n  STRATUM-URL: stratum+tcp://hash4.life\n  STRATUM-PORT: 3636\n Extra Config: -p c=RVN\n\n**[suprnova](https://rvn.suprnova.cc/)**\n  STRATUM-URL: stratum+tcp://rvn.suprnova.cc\n  STRATUM-Port: 6666\n  High Diff Port: 6667\n\n**EXAMPLE:**\n`-o STRATUM-URL:PORT -u WALLET/LOGIN`",
        color: 7976557,
        author: {
          name: "Raven Pools List",
          icon_url: "https://i.imgur.com/ZoakSOl.png"
        }
      };
      msg.channel.send({ embed });
    }
  }
};
