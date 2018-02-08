let needle = require("needle");
let config = require("config");
let hasHashBotChannels = require("../helpers.js").hasHashBotChannels;
let inPrivate = require("../helpers.js").inPrivate;
let ChannelID = config.get("hashbot").mainchannel;
exports.commands = [
  "hash" // command that is in this file, every command needs it own export as shown below
];

exports.hash = {
  usage: "",
  description: "Displays current Stats of Raven Network\n",
  process: function(bot, msg, suffix) {
    var command = "!network";
    words = suffix
      .trim()
      .split(" ")
      .filter(function(n) {
        return n !== "";
      });
    if (!inPrivate(msg) && !hasHashBotChannels(msg)) {
      msg.channel.send(
        "Please use <#" + ChannelID + "> or DMs to talk to Network bot."
      );
      return;
    }
    needle.get("http://threeeyed.info/api/getmininginfo", function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        msg.channel.send("whattomine API is not available");
      } else {
        var data = response.body;
        var height = Number(data.blocks);
        var hashrate = Number(data.networkhashps) / 1000000000;
        var difficulty = Number(data.difficulty);
        var reward = 5000;
        description =
          "Current block: " +
          numberWithCommas(height.toFixed(0)) +
          "\n" +
          "Hashrate: " +
          hashrate.toFixed(2) +
          " Gh/s\n" +
          "Difficulty: " +
          numberWithCommas(difficulty.toFixed(0)) +
          "\n" +
          "Block Reward: " +
          numberWithCommas(reward.toFixed(0)) +
          " RVN \n" +
          "Sources: http://threeeyed.info/";
        const embed = {
          description: description,
          color: 7976557,
          author: {
            name: "Raven Network Stats",
            icon_url: "https://i.imgur.com/ZoakSOl.png"
          }
        };
        msg.channel.send({ embed });
        return;
      }
    });
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
