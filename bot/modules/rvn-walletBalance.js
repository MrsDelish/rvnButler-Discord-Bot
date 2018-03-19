let needle = require('needle');
let config = require('config');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let ChannelID = config.get('Channels').botspam;
exports.commands = [
  'balance' // command that is in this file, every command needs it own export as shown below
];

exports.balance = {
  usage: '<Address>',
  description: 'Displays current blanace of raven address supplied',
  process: function(bot, msg, suffix) {
    var command = '!balance';
    words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    if (
      words[0] == 'dev' ||
      words[0] == 'devfund' ||
      words[0] == 'market' ||
      words[0] == 'marketfund' ||
      words[0] == 'marketingfund' ||
      words[0] == 'marketing'
    ) {
      if (words[0] == 'dev' || words[0] == 'devfund') {
        var address = 'RT2r9oGxQxbVE1Ji5p5iPgrqpNQLfc8ksH';
      } else {
        var address = 'RNwtuuLL1YCCHQhwY3nAoGqNkd1LSQFA1G';
      }
    } else {
      var address = words[0];
    }
    if (!inPrivate(msg) && !hasRvnCalcPriceChannels(msg)) {
      msg.channel.send(
        'Please use <#' + ChannelID + '> or DMs to talk to balance bot.'
      );
      return;
    }
    if (address == undefined) {
      msg.channel.send('please supply a address!');
      return;
    }
    needle.get('https://rvn.hash4.life/ext/getbalance/' + address, function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        msg.channel.send('rvn.hash4.life API is not available');
      } else {
        var data = response.body;
        var balance = Number(data).toFixed(2);
        var description =
          'Current balance: ' + numberWithCommas(balance) + ' RVN';
        msg.channel.send(description);
        return;
      }
    });
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
