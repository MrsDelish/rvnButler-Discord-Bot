'use strict';
let needle = require('needle');
let axios = require('axios');
let config = require('config');
let moment = require('moment-timezone');
let hasRvnStatsNetworkChannels = require('../helpers.js')
  .hasRvnStatsNetworkChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinName = config.get('General').urls.CoinName;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['network'];

exports.network = {
  usage: '',
  description: 'Displays current Network Stats',
  process: function(bot, msg) {
    if (!inPrivate(msg) && !hasRvnStatsNetworkChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to hash bot.'
      );
      return;
    }
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    var algolist = {
      '0': 'blake',
      '1': 'bmw',
      '2': 'groestl',
      '3': 'jh',
      '4': 'keccak',
      '5': 'skein',
      '6': 'luffa',
      '7': 'cubehash',
      '8': 'shavite',
      '9': 'simd',
      a: 'echo',
      b: 'hamsi',
      c: 'fugue',
      d: 'shabal',
      e: 'whirlpool',
      f: 'sha512'
    };
    needle.get(explorerApiUrl + 'api/getmininginfo', function(error, response) {
      if (error || response.statusCode !== 200) {
        msg.channel.send(explorerApiUrl + ' API is not available');
      } else {
        var currentHeight = Number(response.body.blocks);
        var currentHashrate = Number(response.body.networkhashps) / 1000000000;
        var currentDifficulty = Number(response.body.difficulty);
        var currentReward = 5000;
        axios
          .get(explorerApiUrl + 'api/getblockhash?index=' + currentHeight)
          .then(response => {
            var blockHash = response.data;
            needle.get(
              explorerApiUrl + 'api/getblock?hash=' + blockHash,
              function(error, response) {
                if (error || response.statusCode !== 200) {
                  msg.channel.send(explorerApiUrl + ' API is not available');
                } else {
                  var currentBlockHash = response.body.previousblockhash;
                  var currentBlockAlgo = currentBlockHash.substr(
                    currentBlockHash.length - 17
                  );
                  var currentAlgo = currentBlockAlgo.split('');
                  var nextBlockHash = response.body.hash;
                  var nextBlockAlgo = nextBlockHash.substr(
                    nextBlockHash.length - 17
                  );
                  var nextAlgo = currentBlockAlgo.split('');
                  var nextBlockHeight = currentHeight + 1;
                  var description =
                    'Hashrate: ' +
                    currentHashrate.toFixed(2) +
                    ' Gh/s\n' +
                    'Difficulty: ' +
                    numberWithCommas(currentDifficulty.toFixed(0)) +
                    '\n' +
                    'Block Reward: ' +
                    numberWithCommas(currentReward.toFixed(0)) +
                    ' ' +
                    coinSymbol +
                    '\n\n' +
                    'Current block: ' +
                    numberWithCommas(currentHeight) +
                    '\n' +
                    'Algo Hash: ' +
                    currentBlockAlgo +
                    '\n' +
                    'Algo Order: \n' +
                    algolist[currentAlgo[0]] +
                    '->' +
                    algolist[currentAlgo[1]] +
                    '->' +
                    algolist[currentAlgo[2]] +
                    '->' +
                    algolist[currentAlgo[3]] +
                    '->' +
                    algolist[currentAlgo[4]] +
                    '->' +
                    algolist[currentAlgo[5]] +
                    '->' +
                    algolist[currentAlgo[6]] +
                    '->' +
                    algolist[currentAlgo[7]] +
                    '->\n' +
                    algolist[currentAlgo[8]] +
                    '->' +
                    algolist[currentAlgo[9]] +
                    '->' +
                    algolist[currentAlgo[10]] +
                    '->' +
                    algolist[currentAlgo[11]] +
                    '->' +
                    algolist[currentAlgo[12]] +
                    '->' +
                    algolist[currentAlgo[13]] +
                    '->' +
                    algolist[currentAlgo[14]] +
                    '->' +
                    algolist[currentAlgo[15]] +
                    '\n\n' +
                    'Sources: ' +
                    explorerApiUrl;
                  const embed = {
                    description: description,
                    color: 7976557,
                    footer: {
                      text: 'Last Updated | ' + timestamp + ' PST'
                    },
                    author: {
                      name: coinName + '(' + coinSymbol + ') Network Stats',
                      icon_url: 'https://i.imgur.com/yWf5USu.png'
                    }
                  };
                  msg.channel.send({ embed });
                  return;
                }
              }
            );
          });
      }
    });
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
