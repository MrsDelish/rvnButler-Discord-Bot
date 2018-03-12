let fs = require('fs');
var moment = require('moment-timezone');

exports.custom = ['Fenton'];

exports.Fenton = function(bot) {
  bot.on('message', msg => {
    if (msg.author.id == '414498219343740928') {
      var logStream = fs.createWriteStream('fenton-discord-log.txt', {
        flags: 'a'
      });
      time = moment()
        .tz('America/Los_Angeles')
        .format('MM-DD-YYYY hh:mm a');
      logStream.write(
        '\r\n[' +
          time +
          '][' +
          msg.channel.name +
          ']Bruce Fenton: ' +
          msg.content
      );
    }
  });
};
