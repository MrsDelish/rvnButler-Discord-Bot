let fs = require('fs');
let moment = require('moment-timezone');

exports.commands = [
  'botmaster' // command name that will be used for next lines of code below
];

exports.botmaster = {
  usage: '', //command usage like !demo <@username>, exclude !demo
  description: 'leave a note for the bot masters', //the description of command for !help command
  process: function(bot, msg, suffix) {
    var logStream = fs.createWriteStream('MSFT-Bot-Notes.txt', {
      flags: 'a'
    });
    time = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    logStream.write(
      '\r\n[' +
        time +
        ' PST][' +
        msg.channel.name +
        ']' +
        msg.author.username +
        ': ' +
        msg.content
    );
    msg.channel.send('Message has been logged for MSFTserver!');
  }
};
