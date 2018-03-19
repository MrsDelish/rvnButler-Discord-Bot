let needle = require('needle');
let moment = require('moment-timezone');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let ChannelID = config.get('Channels').botspam;

exports.commands = ['price'];

exports.price = {
  usage: '<amount> <fiat/coin>',
  description:
    'display price of RVN in specified alt coin/fiat from crypto compare\n  **Example:** *!price USD 100*\n  **Supported Fiats:** *usd*, *eur*, *gbp*, *aud*, *brl*, *cad*, *chf*, *clp*, *cny*, *czk*, *dkk*, *hkd*, *huf*, *idr*, *ils*, *inr*, *jpy*, *krw*, *mxn*, *myr*, *nok*, *nzd*, *php*, *pkr*, *pln*, *rub*, *sek*, *sgd*, *thb*, *try*, *twd*, *zar* (case-insensitive)',
  process: function(bot, msg, suffix) {
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    if (!hasRvnCalcPriceChannels(msg) && !inPrivate(msg)) {
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
      if (words[1] == undefined) {
        var currency2 = 'BTC';
      } else {
        var currency2 = words[1].toUpperCase();
      }
      if (words[0] == undefined) {
        var amount = '1';
      } else {
        if (getValidatedAmount(words[0]) === null) {
          msg.reply('Please specify a number! <fiat/coin> <amount>');
          return;
        }
        var amount = words[0].toUpperCase();
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
          Number(JSON1.findIndex(symbols => symbols.symbol == currency2)) != -1
        ) {
          var hasMatch = true;
        } else {
          var hasMatch = false;
        }
        if (
          currency2 == 'USD' ||
          currency2 == 'usd' ||
          currency2 == 'AUD' ||
          currency2 == 'aud' ||
          currency2 == 'BRL' ||
          currency2 == 'brl' ||
          currency2 == 'CAD' ||
          currency2 == 'cad' ||
          currency2 == 'CHF' ||
          currency2 == 'chf' ||
          currency2 == 'CLP' ||
          currency2 == 'clp' ||
          currency2 == 'CNY' ||
          currency2 == 'cny' ||
          currency2 == 'CZK' ||
          currency2 == 'czk' ||
          currency2 == 'DKK' ||
          currency2 == 'dkk' ||
          currency2 == 'EUR' ||
          currency2 == 'eur' ||
          currency2 == 'GBP' ||
          currency2 == 'gbp' ||
          currency2 == 'HKD' ||
          currency2 == 'hkd' ||
          currency2 == 'HUF' ||
          currency2 == 'huf' ||
          currency2 == 'IDR' ||
          currency2 == 'idr' ||
          currency2 == 'ILS' ||
          currency2 == 'ils' ||
          currency2 == 'INR' ||
          currency2 == 'inr' ||
          currency2 == 'JPY' ||
          currency2 == 'jpy' ||
          currency2 == 'KRW' ||
          currency2 == 'krw' ||
          currency2 == 'MXN' ||
          currency2 == 'mxn' ||
          currency2 == 'MYR' ||
          currency2 == 'myr' ||
          currency2 == 'NOK' ||
          currency2 == 'nok' ||
          currency2 == 'NZD' ||
          currency2 == 'nzd' ||
          currency2 == 'PHP' ||
          currency2 == 'php' ||
          currency2 == 'PKR' ||
          currency2 == 'pkr' ||
          currency2 == 'PLN' ||
          currency2 == 'pln' ||
          currency2 == 'RUB' ||
          currency2 == 'rub' ||
          currency2 == 'SEK' ||
          currency2 == 'sek' ||
          currency2 == 'SGD' ||
          currency2 == 'sgd' ||
          currency2 == 'THB' ||
          currency2 == 'thb' ||
          currency2 == 'TRY' ||
          currency2 == 'try' ||
          currency2 == 'TWD' ||
          currency2 == 'twd' ||
          currency2 == 'ZAR' ||
          currency2 == 'zar'
        ) {
          var symbol = currency1;
        } else {
          if (!hasMatch) {
            msg.channel.send('Invalid Fiat/Alt!');
            return;
          } else {
            var symbol = currency1;
          }
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
