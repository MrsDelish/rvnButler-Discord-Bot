let moment = require('moment-timezone');
let inSpam = require('../helpers.js').inSpam;

exports.commands = [
  'uptime'
]

exports.uptime = {
  usage: '',
  description: 'description of command',
  process: function(bot,msg){
    if (!inSpam(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to uptime bot.'
      );
      return;
    }
    msg.channel.send('i have been Butlering for ' +
    Math.round(bot.uptime / (1000 * 60 * 60)) + ' hours, ' +
    Math.round(bot.uptime / (1000 * 60)) % 60 + ' minutes, and ' +
     (Math.round(bot.uptime / 1000) % 60) + ' seconds')
    }
}
