let config = require('config');
let hasPoolsBotChannels = require('../helpers.js').hasPoolsBotChannels;

exports.commands = [
  'pools' // command name that will be used for next lines of code below
];

exports.pools = {
  usage: '',
  description: 'Pools',
  process: function(bot, msg, suffix) {
    if (!hasPoolsBotChannels(msg)) {
      msg.channel
        .send("can't use this command here")
        .then(message => message.delete(5000));
    } else {
      var Pool1 =
        '**[Mining Panda](https://miningpanda.site/)** :\n' +
        '  STRATUM-URL: stratum+tcp://miningpanda.site:3636\n' +
        '  Extra Config: -p c=RVN\n';
      var Pool2 =
        '**[rvn pool](https://rvnpool.com/)** :\n' +
        '  STRATUM-URL: stratum+tcp://rvnpool.com:3333\n';
      var Pool3 =
        '**[Mine Pool](https://www.minepool.com/)** :\n' +
        '  STRATUM-URL: stratum+tcp://minepool.com:3636\n';
      var Pool4 =
        '**[three eyed](http://mine.threeeyed.info/)** :\n' +
        '  STRATUM-URL: stratum+tcp://stratum.threeeyed.info:3333\n';
      var Pool5 =
        '**[Crypto pool Party](https://cryptopool.party/)** :\n' +
        '  STRATUM-URL: stratum+tcp://cryptopool.party:3636\n' +
        '  Extra Config: -p c=RVN\n';
      var Pool6 =
        '**[hash 4 life](https://hash4.life/)** :\n' +
        '  STRATUM-URL: stratum+tcp://hash4.life:3636\n' +
        '  Extra Config: -p c=RVN\n';
      var Pool7 =
        '**[Yiimp](http://yiimp.eu/)** :\n' +
        '  STRATUM-URL: stratum+tcp://yiimp.eu:3666\n' +
        '  Extra Config: -p c=RVN\n';
      var Pool8 =
        '**[suprnova](https://rvn.suprnova.cc/)** :\n' +
        '  STRATUM-URL: stratum+tcp://rvn.suprnova.cc:6666\n' +
        '  High Diff Port: 6667\n';
      var Pool9 =
        '**[masterhash](https://pool.masterhash.us)** :\n' +
        '  STRATUM-URL: stratum+tcp://pool.masterhash.us:10023\n' +
        '  Extra Config: -p c=RVN\n' +
        '  Nice Hash Port: 20023\n';
      var Pool10 =
        '**[noip](http://pool.noip.ro/)** :\n' +
        '  STRATUM-URL: stratum+tcp://pool.noip.ro:3636\n' +
        '  Extra Config: -p c=RVN\n';
      var PoolEX = '**EXAMPLE:**\n`-o STRATUM-URL:PORT -u WALLET/LOGIN`';
      var messagetext = suffix.toLowerCase();
      if (!messagetext) {
        var Pool =
          Pool1 +
          Pool2 +
          Pool3 +
          Pool4 +
          Pool5 +
          Pool6 +
          Pool7 +
          Pool8 +
          Pool9 +
          Pool10 +
          PoolEX;
      }
      if (
        messagetext == 'noip' ||
        messagetext == 'noip ro' ||
        messagetext == 'pool noip' ||
        messagetext == 'pool.noip' ||
        messagetext == 'noip.ro' ||
        messagetext == 'pool noip ro' ||
        messagetext == 'pool.noip.ro'
      ) {
        var Pool = Pool10;
      }
      if (
        messagetext == 'masterhash us' ||
        messagetext == 'masterhash' ||
        messagetext == 'pool.masterhash' ||
        messagetext == 'masterhash.us' ||
        messagetext == 'pool masterhash us' ||
        messagetext == 'pool.masterhash.us'
      ) {
        var Pool = Pool9;
      }
      if (
        messagetext == 'suprnova' ||
        messagetext == 'supr nova' ||
        messagetext == 'suprnova.cc' ||
        messagetext == 'rvn.suprnova.cc' ||
        messagetext == 'rvn.suprnova'
      ) {
        var Pool = Pool8;
      }
      if (
        messagetext == 'yiimp' ||
        messagetext == 'yiimp eu' ||
        messagetext == 'yiimp.eu'
      ) {
        var Pool = Pool7;
      }
      if (
        messagetext == 'hash 4 life' ||
        messagetext == 'hash4life' ||
        messagetext == 'hash4 life' ||
        messagetext == 'hash4.life'
      ) {
        var Pool = Pool6;
      }
      if (
        messagetext == 'crypto pool party' ||
        messagetext == 'cryptopoolparty' ||
        messagetext == 'cryptopool party' ||
        messagetext == 'cryptopool.party'
      ) {
        var Pool = Pool5;
      }
      if (
        messagetext == 'three eyed' ||
        messagetext == 'threeeyed' ||
        messagetext == '3eyed' ||
        messagetext == 'pool.threeeyed' ||
        messagetext == 'pool.threeeyed.info'
      ) {
        var Pool = Pool4;
      }
      if (
        messagetext == 'mine pool' ||
        messagetext == 'minepool' ||
        messagetext == 'minepool.com'
      ) {
        var Pool = Pool3;
      }
      if (
        messagetext == 'rvn pool' ||
        messagetext == 'rvnpool' ||
        messagetext == 'rvnpool.com'
      ) {
        var Pool = Pool2;
      }
      if (
        messagetext == 'mining panda' ||
        messagetext == 'miningpanda' ||
        messagetext == 'panda' ||
        messagetext == 'miningpanda.site'
      ) {
        var Pool = Pool1;
      }
      if (!Pool) {
        return;
      }
      const embed = {
        description: Pool,
        color: 7976557,
        author: {
          name: 'Raven Pools',
          icon_url: 'https://i.imgur.com/ZoakSOl.png'
        }
      };
      msg.channel.send({ embed });
    }
  }
};
