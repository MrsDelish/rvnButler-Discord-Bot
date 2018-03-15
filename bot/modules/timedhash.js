let jp = require("jsonpath");
let moment = require('moment-timezone');
let numeral = require("numeral");
let request = require("request");
let config = require("config");
let needle = require("needle");
let TimedHashChannel = config.get("Channels").timedhash;

exports.custom = ["TimedHash"];

exports.TimedHash = function(bot) {
  setInterval(function() {
    sendInfo(bot);
  }, 3600000
);

  function sendInfo(bot) {
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    needle.get("https://rvn.hash4.life/api/getmininginfo", function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        bot.channels
          .get(TimedHashChannel)
          .send("rvn.hash4.life API is not available");
      } else {
        var data = response.body;
        var height = Number(data.blocks);
        var hashrate = Number(data.networkhashps) / 1000000000;
        var difficulty = Number(data.difficulty);
        var reward = 5000;
        var block_time = 60;
          description =
            "Hashrate: " +
            numberWithCommas(hashrate.toFixed(2)) +
            " Gh/s\n" +
            "Difficulty: " +
            numberWithCommas(difficulty.toFixed(0)) +
            "\n" +
            "Current block: " +
            numberWithCommas(height.toFixed(0)) +
            "\n" +
            "Block Time: " +
            numberWithCommas(block_time.toFixed(0)) +
            " seconds \n" +
            "Block Reward: " +
            numberWithCommas(reward.toFixed(0)) +
            " RVN \n" +
            "Sources: https://rvn.hash4.life";
            const embed = {
              description: description,
              color: 7976557,
              footer: {
                text: "Last Updated | " + timestamp
              },
              author: {
                name: "Ravencoin Network Stats",
                icon_url: "https://i.imgur.com/ZoakSOl.png"
              }
            };
            bot.channels.get(TimedHashChannel).send({ embed });
      }
    });
    function parse_obj(obj) {
      var array = [];
      var prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          var key = parseInt(prop, 10);
          var value = obj[prop];
          if (typeof value == "object") {
            value = parse_obj(value);
          }
          array[key] = value;
        }
      }
      return array;
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
