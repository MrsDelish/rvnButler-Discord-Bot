let jp = require('jsonpath');
let moment = require('moment-timezone');
let numeral = require('numeral');
let request = require('request');
let config = require('config');
let needle = require('needle');
let axios = require('axios');
let TimedHashChannel = config.get('TimedBots').hash;
let Timer = config.get('TimedBots').timerhash;

exports.custom = ['TimedHash'];

exports.TimedHash = function(bot) {
  setInterval(function() {
    sendInfo(bot);
  }, Timer);

  function sendInfo(bot) {
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
    needle.get('https://rvn.hash4.life/api/getmininginfo', function(
      error,
      response
    ) {
      if (error || response.statusCode !== 200) {
        msg.channel.send('rvn.hash4.life API is not available');
      } else {
        var currentHeight = Number(response.body.blocks);
        var currentHashrate = Number(response.body.networkhashps) / 1000000000;
        var currentDifficulty = Number(response.body.difficulty);
        var currentReward = 5000;
        axios
          .get('https://rvn.hash4.life/api/getblockhash?index=' + currentHeight)
          .then(response => {
            var blockHash = response.data;
            needle.get(
              'https://rvn.hash4.life/api/getblock?hash=' + blockHash,
              function(error, response) {
                if (error || response.statusCode !== 200) {
                  msg.channel.send('rvn.hash4.life API is not available');
                } else {
                  var currentBlockHash = response.body.previousblockhash;
                  var currentBlockAlgo = currentBlockHash.substr(
                    currentBlockHash.length - 17
                  );
                  var currentAlgo = currentBlockAlgo.split('');
                  var currentAlgoOrder =
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
                    algolist[currentAlgo[15]];
                  var nextBlockHash = response.body.hash;
                  var nextBlockAlgo = nextBlockHash.substr(
                    nextBlockHash.length - 17
                  );
                  var nextAlgo = currentBlockAlgo.split('');
                  var nextAlgoOrder =
                    algolist[nextAlgo[0]] +
                    '->' +
                    algolist[nextAlgo[1]] +
                    '->' +
                    algolist[nextAlgo[2]] +
                    '->' +
                    algolist[nextAlgo[3]] +
                    '->' +
                    algolist[nextAlgo[4]] +
                    '->' +
                    algolist[nextAlgo[5]] +
                    '->' +
                    algolist[nextAlgo[6]] +
                    '->' +
                    algolist[nextAlgo[7]] +
                    '->\n' +
                    algolist[nextAlgo[8]] +
                    '->' +
                    algolist[nextAlgo[9]] +
                    '->' +
                    algolist[nextAlgo[10]] +
                    '->' +
                    algolist[nextAlgo[11]] +
                    '->' +
                    algolist[nextAlgo[12]] +
                    '->' +
                    algolist[nextAlgo[13]] +
                    '->' +
                    algolist[nextAlgo[14]] +
                    '->' +
                    algolist[nextAlgo[15]];
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
                    ' RVN\n\n' +
                    'Current block: ' +
                    numberWithCommas(currentHeight) +
                    '\n' +
                    'Algo Hash: ' +
                    currentBlockAlgo +
                    '\n' +
                    'Algo Order: ' +
                    currentAlgoOrder +
                    '\n\n' +
                    'Next block: ' +
                    nextBlockHeight +
                    '\n' +
                    'Next Algo Hash: ' +
                    numberWithCommas(nextBlockAlgo) +
                    '\n' +
                    'Next Algo Order: \n' +
                    nextAlgoOrder +
                    '\n\n' +
                    'Sources: https://rvn.hash4.life';
                  const embed = {
                    description: description,
                    color: 7976557,
                    footer: {
                      text: 'Last Updated | ' + timestamp
                    },
                    author: {
                      name: 'Ravencoin Network Stats',
                      icon_url: 'https://i.imgur.com/yWf5USu.png'
                    }
                  };
                  bot.channels.get(TimedHashChannel).send({ embed });
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