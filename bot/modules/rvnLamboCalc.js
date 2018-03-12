'use strict';
let jp = require('jsonpath');
let moment = require('moment-timezone');
let numeral = require('numeral');
let request = require('request');
let config = require('config');
let needle = require('needle');
let hasPriceBotChannels = require('../helpers.js').hasPriceBotChannels;
let inPrivate = require('../helpers.js').inPrivate;
let ChannelID = config.get('pricebot').mainchannel;
let responseDebug = false;

exports.commands = [
  'lambo' // command name that will be used for next lines of code below
];

exports.lambo = {
  usage: '<amount-optional>', //command usage like !demo <@username>, exclude !demo
  description:
    'displays amount of RVN to get a lambo\n    if <amount> is supplied that will be deducted from total price towards 1 Lambo!', //the description of command for !help command
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
    } else {
      rvnLamboCalc(bot, msg, suffix);
    }

    function rvnLamboCalc(bot, msg, suffix) {
      var words = suffix
        .trim()
        .split(' ')
        .filter(function(n) {
          return n !== '';
        });
      needle.get(
        'https://api.coinmarketcap.com/v1/ticker/ravencoin/?convert=USD',
        function(error, response) {
          if (error || response.statusCode !== 200) {
            msg.channel.send('blockchain.info API is not available');
          } else {
            if (words[0] == undefined) {
              var amount = 1;
            } else {
              var amount = words[0];
            }
            var data = response.body[0];
            var rvnrate = Number(data.price_usd);
            var cost = 250000 / rvnrate;
            if (responseDebug) {
            }
            if (amount <= 1) {
              var message = cost.toFixed(0) + ' RVN = 1 Lambo Huracan';
              if (responseDebug) {
              }
            } else {
              cost = cost - amount;
              var message =
                'Need **' + cost.toFixed(0) + ' RVN** for 1 Lambo Huracan';
              if (responseDebug) {
              }
            }
            const embed = {
              description: message,
              color: 7976557,
              footer: {
                text: 'Last Updated | ' + timestamp
              },
              author: {
                name: 'RVN to 1 Lambo Calc'
              }
            };
            msg.channel.send({ embed });
          }
        }
      );
    }
  }
};
