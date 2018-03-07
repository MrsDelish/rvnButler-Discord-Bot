const discord = require('discord.js');
const embed = new discord.RichEmbed()
let config = require('config');
let hasPoolsBotChannels = require('../helpers.js').hasPoolsBotChannels;
let hasDediPoolsChannels = require('../helpers.js').hasDediPoolsChannels;

exports.commands = [
  'pools' // command name that will be used for next lines of code below
];

exports.pools = {
  usage: '',
  description: 'Pools',
  process: function(bot, msg, suffix) {
    let msgauthor = msg.author
    var Pool1 =
      '**[miningpanda](https://miningpanda.site/)** :\n' +
      '  STRATUM-URL: stratum+tcp://miningpanda.site:3636\n' +
      '  Extra Config: -p c=RVN\n' +
      '  High Diff Port: 3666\n';
    var Pool2 =
      '**[omegapool](https://www.omegapool.cc/)** :\n' +
      '  STRATUM-URL: stratum+tcp://omegapool.cc:8006\n';
    var Pool3 =
      '**[minepool](https://www.minepool.com/)** :\n' +
      '  STRATUM-URL: stratum+tcp://minepool.com:3636\n';
    var Pool4 =
      '**[ravenminer](http://ravenminer.com/)** :\n' +
      '  STRATUM-URL: stratum+tcp://ravenminer.com:3636\n';
    var Pool5 =
      '**[threeeyed](http://mine.threeeyed.info/)** :\n' +
      '  STRATUM-URL: stratum+tcp://stratum.threeeyed.info:3333\n';
    var Pool6 =
      '**[Cryptopool Party](https://cryptopool.party/)** :\n' +
      '  STRATUM-URL: stratum+tcp://cryptopool.party:3636\n' +
      '  Extra Config: -p c=RVN\n';
    var Pool7 =
      '**[hash4 life](https://hash4.life/)** :\n' +
      '  STRATUM-URL: stratum+tcp://hash4.life:3636\n' +
      '  Extra Config: -p c=RVN\n';
    var Pool8 =
      '**[noip](http://pool.noip.ro/)** :\n' +
      '  STRATUM-URL: stratum+tcp://pool.noip.ro:3636\n' +
      '  Extra Config: -p c=RVN\n';
    var Pool9 =
      '**[Yiimp](http://yiimp.eu/)** :\n' +
      '  STRATUM-URL: stratum+tcp://yiimp.eu:3666\n' +
      '  Extra Config: -p c=RVN\n';
    var Pool10 =
      '**[suprnova](https://rvn.suprnova.cc/)** :\n' +
      '  STRATUM-URL: stratum+tcp://rvn.suprnova.cc:6666\n' +
      '  High Diff Port: 6667\n';
    var Pool11 =
      '**[masterhash](https://pool.masterhash.us)** :\n' +
      '  STRATUM-URL: stratum+tcp://pool.masterhash.us:10023\n' +
      '  Extra Config: -p c=RVN\n' +
      '  Nice Hash Port: 20023\n';
    var Pool12 =
      '**[minersport](http://minersport.us/)** :\n' +
      '  STRATUM-URL: stratum+tcp://minersport.us:3636\n' +
      '  Extra Config: -p c=RVN\n';
    var Pool13 =
      '**[gorogoro](https://gorogoro.asia/)** :\n' +
      '  STRATUM-URL: stratum+tcp://pool.gorogoro.asia:3636\n';
    var Pool14 =
      '**[upthehash](https://upthehash.com/)** :\n' +
      '  STRATUM-URL: stratum+tcp://upthehash.com:3636\n' +
      '  Alt Stratum URL: stratum+tcp://35.227.115.143:3636\n';
    var Pool15 =
      '**[iampool](https://rvn.iampool.com/)** :\n' +
      '  STRATUM-URL: stratum+tcp://rvn.iampool.com:3333\n';
    var Pool16 =
      '**[fubarpool](https://fubarpool.com/)** :\n' +
      '  STRATUM-URL: stratum+tcp://fubarpool.com:3636\n' +
      '  Extra Config: -p c=RVN\n';
    var PoolEX = '**EXAMPLE:**\n`-o STRATUM-URL:PORT -u WALLET/LOGIN`';
    var messagetext = suffix.toLowerCase();
    if (!messagetext) {
      var Pools1 =
        Pool1 +
        Pool2 +
        Pool3 +
        Pool4 +
        Pool5 +
        Pool6;
      var Pools2 =
        Pool7 +
        Pool8 +
        Pool9 +
        Pool10 +
        Pool11 +
        Pool12;
      var Pools3 =
        Pool13 +
        Pool14 +
        Pool15 +
        Pool16 +
        PoolEX;
        embed.setColor(0x4286F4)
        embed.setAuthor("Raven Pools (Page 1 of 3)", "https://i.imgur.com/ZoakSOl.png")
        embed.setDescription(Pools1)
        msgauthor.send({embed})
        .then(msg => {
          embed.setAuthor("Raven Pools (Page 2 of 3)", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pools2)
          msgauthor.send({embed})
        }).then(msg => {
          embed.setAuthor("Raven Pools (Page 3 of 3)", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pools3)
          msgauthor.send({embed})
        });
        msg.channel
          .send("Pools list sent via DM")
          .then(message => message.delete(5000));
    } else {
      if (
        messagetext == 'mining panda' ||
        messagetext == 'miningpanda' ||
        messagetext == 'panda' ||
        messagetext == 'miningpanda.site'
      ) {
        var Pool = Pool1;
        var Poolname = 'miningpanda';
        if (msg.channel.id == '416991571787907074') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'omegapool.cc' ||
        messagetext == 'omegapoolcc' ||
        messagetext == 'omegapool cc' ||
        messagetext == 'omegapool' ||
        messagetext == 'omega' ||
        messagetext == 'omega pool' ||
        messagetext == 'omega pool cc'
      ) {
        var Pool = Pool2;
        var Poolname = 'omegapool'
        if (msg.channel.id == '418896775638941721') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'mine pool' ||
        messagetext == 'minepool' ||
        messagetext == 'minepool.com'
      ) {
        var Pool = Pool3;
        var Poolname = 'minepool'
        if (msg.channel.id == '417872708907565058') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'ravenminer' ||
        messagetext == 'ravenminer.com' ||
        messagetext == 'raven miner'
      ) {
        var Pool = Pool4;
        var Poolname = 'ravenminer'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'three eyed' ||
        messagetext == 'threeeyed' ||
        messagetext == '3eyed' ||
        messagetext == 'pool.threeeyed' ||
        messagetext == 'pool threeeyed' ||
        messagetext == 'pool threeeyed info' ||
        messagetext == 'pool.threeeyed.info' ||
        messagetext == 'mine.threeeyed.info' ||
        messagetext == 'mine threeeyed info' ||
        messagetext == 'mine threeeyed' ||
        messagetext == 'stratum.threeeyed.info' ||
        messagetext == 'stratum threeeyed info' ||
        messagetext == 'stratum threeeyed'
      ) {
        var Pool = Pool5;
        var Poolname = 'threeeyed'
        if (msg.channel.id == '414961715592167434') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'crypto pool party' ||
        messagetext == 'cryptopoolparty' ||
        messagetext == 'cryptopool party' ||
        messagetext == 'cryptopool' ||
        messagetext == 'crypto pool' ||
        messagetext == 'pool party' ||
        messagetext == 'cryptopool.party'
      ) {
        var Pool = Pool6;
        var Poolname = 'cryptopoolparty'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'hash 4 life' ||
        messagetext == 'hash 4' ||
        messagetext == 'hash4' ||
        messagetext == 'hash4life' ||
        messagetext == 'hash4 life' ||
        messagetext == 'hash4.life'
      ) {
        var Pool = Pool7;
        var Poolname = 'hash4life'
        if (msg.channel.id == '420312077488619531') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'noip' ||
        messagetext == 'no ip' ||
        messagetext == 'noip ro' ||
        messagetext == 'pool noip' ||
        messagetext == 'pool.noip' ||
        messagetext == 'noip.ro' ||
        messagetext == 'pool noip ro' ||
        messagetext == 'pool.noip.ro'
      ) {
        var Pool = Pool8;
        var Poolname = 'noip'
        if (msg.channel.id == '417956255269650432') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'yiimp' ||
        messagetext == 'yiimp eu' ||
        messagetext == 'yiimp.eu'
      ) {
        var Pool = Pool9;
        var Poolname = 'yiimp'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'suprnova' ||
        messagetext == 'supr nova' ||
        messagetext == 'suprnova.cc' ||
        messagetext == 'rvn.suprnova.cc' ||
        messagetext == 'rvn.suprnova'
      ) {
        var Pool = Pool10;
        var Poolname = 'suprnova'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'masterhash us' ||
        messagetext == 'masterhash' ||
        messagetext == 'master hash' ||
        messagetext == 'pool.masterhash' ||
        messagetext == 'masterhash.us' ||
        messagetext == 'pool masterhash us' ||
        messagetext == 'pool.masterhash.us'
      ) {
        var Pool = Pool11;
        var Poolname = 'masterhash'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'minersport.us' ||
        messagetext == 'minersport us' ||
        messagetext == 'miner sport us' ||
        messagetext == 'minersportus' ||
        messagetext == 'miner sport' ||
        messagetext == 'minersport'
      ) {
        var Pool = Pool12;
        var Poolname = 'minersport'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'gorogoro.asia' ||
        messagetext == 'gorogoroasia' ||
        messagetext == 'gorogoro asia' ||
        messagetext == 'gorogoro' ||
        messagetext == 'goro goro' ||
        messagetext == 'pool.gorogoro.asia' ||
        messagetext == 'pool gorogoro' ||
        messagetext == 'pool.gorogoro'
      ) {
        var Pool = Pool13;
        var Poolname = 'gorogoro'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'upthehash.com' ||
        messagetext == 'upthehash com' ||
        messagetext == 'upthehash' ||
        messagetext == 'up the hash' ||
        messagetext == 'up thehash' ||
        messagetext == 'upthe hash'
      ) {
        var Pool = Pool14;
        var Poolname = 'upthehash'
        if (msg.channel.id == '420834968420352000') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'rvn.iampool.com' ||
        messagetext == 'rvn.iampool' ||
        messagetext == 'rvn iampool com' ||
        messagetext == 'rvn iampool' ||
        messagetext == 'iampool' ||
        messagetext == 'iampool.com' ||
        messagetext == 'iampool com'
      ) {
        var Pool = Pool15;
        var Poolname = 'iampool'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'fubarpool.com' ||
        messagetext == 'fubarpool com' ||
        messagetext == 'fubarpoolcom' ||
        messagetext == 'fubarpool' ||
        messagetext == 'fubar pool' ||
        messagetext == 'fubar'
      ) {
        var Pool = Pool16;
        var Poolname = 'fubarpool'
        if (msg.channel.id == '###') {
          embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
          embed.setDescription(Pool)
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (!Pool) {
        return;
      }
      if (hasDediPoolsChannels(msg)) {
        msg.channel
          .send("can't use this command here")
          .then(message => message.delete(5000));
        return;
      }
      embed.setAuthor(Poolname + " Options", "https://i.imgur.com/ZoakSOl.png")
      embed.setDescription(Pool)
      msg.channel.send({
        embed
      })
    }
  }
};
