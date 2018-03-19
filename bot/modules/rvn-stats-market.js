let config = require('config');
let needle = require('needle');
let moment = require('moment-timezone');
let hasRvnCalcPriceChannels = require('../helpers.js').hasRvnCalcPriceChannels;
let inPrivate = require('../helpers.js').inPrivate;
let ChannelID = config.get('Channels').botspam;

exports.commands = ['market'];

exports.market = {
  usage: '',
  description: 'gets market stats for ravencoin(RVN)',
  process: function(bot, msg, suffix) {
    if (!hasRvnCalcPriceChannels(msg) && !inPrivate(msg)) {
      msg.channel.send(
        'Please use <#' + ChannelID + '> or DMs to talk to stats bot.'
      );
      return;
    }
    coin = 'RVN';
    needle.get('https://api.coinmarketcap.com/v1/ticker/?limit=0', function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        msg.channel.send('coinmarketcap API is not available');
      } else {
        JSON1 = response.body;
        if (Number(JSON1.findIndex(symbols => symbols.symbol == coin)) != -1) {
          hasMatch = true;
        } else {
          hasMatch = false;
        }
        if (!hasMatch) {
          msg.channel.send('Invalid Alt Coin');
          return;
        } else {
          symbol = coin;
        }
        position = Number(JSON1.findIndex(symbols => symbols.symbol == symbol));
        name = response.body[position].id;
        apiurl = 'https://api.coinmarketcap.com/v1/ticker/' + name + '/';
        needle.get(apiurl, function(error, response) {
          if (error || response.statusCode !== 200) {
            msg.channel.send('coinmarketcap API is not available');
          } else {
            data = response.body[0];
            rank = data.rank;
            price_usd = Number(data.price_usd);
            price_btc = Number(data.price_btc);
            market_cap_usd = Number(data.market_cap_usd);
            total_supply = Number(data.total_supply);
            max_supply = 21000000000;
            percent_change_1h = Number(data.percent_change_1h);
            percent_change_24h = Number(data.percent_change_24h);
            json = response.body[0];
            newjson = parse_obj(json);
            parse = JSON.stringify(newjson);
            volume24_usd = parse.replace(/[^0-9]/g, '');
            dt = new Date();
            timestamp = moment()
              .tz('America/Los_Angeles')
              .format('MM-DD-YYYY hh:mm a');
            hr_indicator = ':thumbsup:';
            day_indicator = ':thumbsup:';
            if (percent_change_1h < 0) {
              hr_indicator = ':thumbsdown:';
            }
            if (percent_change_24h < 0) {
              day_indicator = ':thumbsdown:';
            }
            if (market_cap_usd == 0) {
              market_cap_usd = Number(price_usd * total_supply);
            }
            needle.get(apiurl + '?convert=GBP', function(error, response) {
              if (error || response.statusCode !== 200) {
                msg.channel.send('coinmarketcap API is not available');
              } else {
                data = response.body[0];
                price_gbp = Number(data.price_gbp);
                needle.get(apiurl + '?convert=EUR', function(error, response) {
                  if (error || response.statusCode !== 200) {
                    msg.channel.send('coinmarketcap API is not available');
                  } else {
                    data = response.body[0];
                    price_eur = Number(data.price_eur);
                    description =
                      '**Rank: [' +
                      rank +
                      '](' +
                      apiurl +
                      ')**\n' +
                      '**Data**\n' +
                      'Market Cap: [$' +
                      numberWithCommas(market_cap_usd.toFixed(2)) +
                      '](' +
                      apiurl +
                      ') \n' +
                      'Max Supply: [' +
                      numberWithCommas(max_supply) +
                      ' ' +
                      symbol +
                      '](' +
                      apiurl +
                      ')\n' +
                      'Circulating Supply: [' +
                      numberWithCommas(total_supply) +
                      ' ' +
                      symbol +
                      '](' +
                      apiurl +
                      ')\n' +
                      '24 Hour Volume: [$' +
                      volume24_usd +
                      '](' +
                      apiurl +
                      ') \n\n' +
                      '**Price**\n' +
                      'BTC: [₿' +
                      price_btc.toFixed(8) +
                      '](' +
                      apiurl +
                      ')\n' +
                      'USD: [$' +
                      price_usd.toFixed(2) +
                      '](' +
                      apiurl +
                      ') \n' +
                      'EUR: [€' +
                      price_eur.toFixed(2) +
                      '](' +
                      apiurl +
                      ') \n' +
                      'GBP: [£' +
                      price_gbp.toFixed(2) +
                      '](' +
                      apiurl +
                      ') \n\n' +
                      '**% Change**\n' +
                      '1 Hour:  [' +
                      percent_change_1h +
                      '](' +
                      apiurl +
                      ')   ' +
                      hr_indicator +
                      ' \n\n' +
                      '1 Day:   [' +
                      percent_change_24h +
                      '](' +
                      apiurl +
                      ')   ' +
                      day_indicator +
                      ' \n\n';
                    const embed = {
                      description: description,
                      color: 7976557,
                      footer: {
                        text: 'Last Updated: ' + timestamp
                      },
                      author: {
                        name: 'Coin Market Cap Stats (' + symbol + ')',
                        url: apiurl,
                        icon_url: 'https://i.imgur.com/aZ1WHCy.png?1'
                      }
                    };
                    msg.channel.send({ embed });
                  }
                });
              }
            });
          }
        });
      }
    });
    function parse_obj(obj) {
      let array = [];
      let prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          key = parseInt(prop, 10);
          value = obj[prop];
          if (typeof value == 'object') {
            value = parse_obj(value);
          }
          array[key] = value;
        }
      }
      return array;
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
