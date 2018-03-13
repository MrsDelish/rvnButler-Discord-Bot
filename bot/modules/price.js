let needle = require('needle');
let moment = require('moment-timezone');
let hasPriceBotChannels = require('../helpers.js').hasPriceBotChannels;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let ChannelID = config.get('pricebot').mainchannel;

exports.commands = ['price'];

exports.price = {
  usage: '<fiat/coin> <amount>',
  description:
    'display price of RVN in specified alt coin/fiat from crypto compare\n  **Example:** *!price USD 100*\n  **Supported Fiats:** *usd*, *eur*, *gbp*, *aud*, *brl*, *cad*, *chf*, *clp*, *cny*, *czk*, *dkk*, *hkd*, *huf*, *idr*, *ils*, *inr*, *jpy*, *krw*, *mxn*, *myr*, *nok*, *nzd*, *php*, *pkr*, *pln*, *rub*, *sek*, *sgd*, *thb*, *try*, *twd*, *zar* (case-insensitive)"',
  process: function(bot, msg, suffix) {
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    if (!hasPriceBotChannels(msg) && !inPrivate(msg)) {
      msg.channel.send(
        'Please use <#' + ChannelID + '> or DMs to talk to price bot.'
      );
      return;
    }
    if (suffix !== '') {
      words = suffix
        .trim()
        .split(' ')
        .filter(function(n) {
          return n !== '';
        });
      var currency1 = 'RVN';
      if (words[0] == undefined) {
        var currency2 = 'BTC';
      } else {
        var currency2 = words[0].toUpperCase();
      }
      if (words[1] == undefined) {
        var amount = '1';
      } else {
        if (getValidatedAmount(words[1]) === null) {
          msg.reply('Please specify a number for <amount>');
          return;
        }
        var amount = words[1].toUpperCase();
      }
    } else {
      var currency1 = 'RVN';
      var currency2 = 'BTC';
      var amount = '1';
    }
    needle.get('https://api.coinmarketcap.com/v1/ticker/?limit=0', function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        msg.channel.send('coinmarketcap API is not available');
      } else {
        JSON1 = response.body;
        if (
          Number(JSON1.findIndex(symbols => symbols.symbol == currency1)) != -1
        ) {
          hasMatch = true;
        } else {
          hasMatch = false;
        }
        if (!hasMatch) {
          msg.channel.send('Invalid Alt Coin');
          return;
        } else {
          symbol = currency1;
        }
        position = Number(JSON1.findIndex(symbols => symbols.symbol == symbol));
        name = response.body[position].id;
        apiurl = 'https://api.coinmarketcap.com/v1/ticker/' + name + '/';
        needle.get(apiurl + '?convert=' + currency2, function(error, response) {
          if (error || response.statusCode !== 200) {
            msg.channel.send('coinmarketcap API is not available');
          } else {
            var newdata = 'price_' + currency2.toLowerCase();
            var price = Number(response.body[0][newdata]);
            var newprice = price * amount;
            var message =
              amount +
              ' ' +
              currency1 +
              ' = ' +
              newprice.toFixed(8) +
              ' ' +
              currency2 +
              '\n' +
              '*Updated: ' +
              timestamp +
              '*';
            msg.channel.send(message);
          }
        });
      }
    });
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
  }
};
