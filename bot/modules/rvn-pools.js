const discord = require('discord.js');
const embed = new discord.RichEmbed();
let config = require('config');
let hasRvnPoolsChannels = require('../helpers.js').hasRvnPoolsChannels;
let hasDediPoolsChannels = require('../helpers.js').hasDediPoolsChannels;
let channelID = config.get('General').Channels.mining;

exports.commands = [
  'pools' // command name that will be used for next lines of code below
];

exports.pools = {
  usage: '<poolname>',
  description:
    'Rvn Pools List\noptionally add pools name to return just that pools setup',
  process: function(bot, msg, suffix) {
    let msgauthor = msg.author;
    var Pool1 =
      '  **[mining panda](https://miningpanda.site/)** :\n' +
      '    STRATUM-URL: stratum+tcp://miningpanda.site:3636\n' +
      '    Extra Config: -p c=RVN\n' +
      '    High Diff Port: 3666\n';
    var Pool2 =
      '  **[omega pool](https://www.omegapool.cc/)** :\n' +
      '    STRATUM-URL: stratum+tcp://omegapool.cc:8006\n';
    var Pool3 =
      '  **[mine pool](https://www.minepool.com/)** :\n' +
      '    STRATUM-URL: stratum+tcp://minepool.com:3636\n';
    var Pool4 =
      '  **[raven miner](http://ravenminer.com/)** :\n' +
      '    STRATUM-URL: stratum+tcp://ravenminer.com:3636\n';
    var Pool5 =
      '  **[three eyed](http://mine.threeeyed.info/)** :\n' +
      '    STRATUM-URL: stratum+tcp://stratum.threeeyed.info:3333\n';
    var Pool6 =
      '  **[Crypto pool Party](https://cryptopool.party/)** :\n' +
      '    STRATUM-URL: stratum+tcp://cryptopool.party:3636\n' +
      '    Extra Config: -p c=RVN\n';
    var Pool7 =
      '  **[hash 4 life](https://hash4.life/)** :\n' +
      '    STRATUM-URL: stratum+tcp://hash4.life:3636\n' +
      '    Extra Config: -p c=RVN\n';
    var Pool8 =
      '  **[krawww-miner](http://krawww-miner.eu/)** :\n' +
      '    STRATUM-URL: stratum+tcp://krawww-miner.eu:3636\n' +
      '    Extra Config: -p c=RVN\n';
    var Pool9 =
      '  **[Yiimp](http://yiimp.eu/)** :\n' +
      '    STRATUM-URL: stratum+tcp://yiimp.eu:3666\n' +
      '    Extra Config: -p c=RVN\n';
    var Pool10 =
      '  **[suprnova](https://rvn.suprnova.cc/)** :\n' +
      '    STRATUM-URL: stratum+tcp://rvn.suprnova.cc:6666\n' +
      '    High Diff Port: 6667\n';
    var Pool11 =
      '  **[master hash](https://pool.masterhash.us)** :\n' +
      '    STRATUM-URL: stratum+tcp://pool.masterhash.us:10023\n' +
      '    Extra Config: -p c=RVN\n' +
      '    Nice Hash Port: 20023\n';
    var Pool12 =
      '  **[the raven coin nest](https://pool.theravencoinnest.com/)** :\n' +
      '    STRATUM-URL: stratum+tcp://pool.theravencoinnest.com:3636\n' +
      '    Extra Config: -p c=RVN\n';
    var Pool13 =
      '  **[goro goro](https://gorogoro.asia/)** :\n' +
      '    STRATUM-URL: stratum+tcp://pool.gorogoro.asia:3636\n';
    var Pool14 =
      '  **[up the hash](https://upthehash.com/)** :\n' +
      '    STRATUM-URL: stratum+tcp://upthehash.com:3636\n' +
      '    Alt Stratum URL: stratum+tcp://35.227.115.143:3636\n';
    var Pool15 =
      '  **[i am pool](https://rvn.iampool.com/)** :\n' +
      '    STRATUM-URL: stratum+tcp://rvn.iampool.com:3333\n';
    var Pool16 =
      '  **[fubar pool](https://fubarpool.com/)** :\n' +
      '    STRATUM-URL: stratum+tcp://fubarpool.com:3636\n' +
      '    Extra Config: -p c=RVN\n';
    var Pool17 =
      '  **[alt tank](http://alttank.ca/)** :\n' +
      '    STRATUM-URL: stratum+tcp://alttank.ca:3636\n' +
      '    Extra Config: -p c=RVN\n';
    var Pool18 =
      '  **[bsod](http://bsod.pw/)** :\n' +
      '    STRATUM-URL: stratum+tcp://pool.bsod.pw:2176\n' +
      '    Alt Stratum Url: stratum+tcp://eu1.bsod.pw:2176' +
      '    Extra Config: -p c=RVN\n';
    var Pool19 =
      '  **[kwchmining](http://kwchmining.com/)** :\n' +
      '    STRATUM-URL: stratum+tcp://kwchmining.com:3636\n' +
      '    Extra Config: -p c=RVN\n';
    var PoolEX = '**EXAMPLE:**\n`-o STRATUM-URL:PORT -u WALLET/LOGIN`';
    var messagetext = suffix.toLowerCase();
    if (!hasRvnPoolsChannels) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to pools bot.'
      );
      return;
    }
    if (!messagetext) {
      msgauthor
        .send(
          '__**Raven Pools (Page 1 of 4)**__\n' +
            Pool1 +
            Pool2 +
            Pool3 +
            Pool4 +
            Pool5 +
            Pool6
        )
        .then(msg => {
          msgauthor.send(
            '__**Raven Pools (Page 2 of 4)**__\n' +
              Pool7 +
              Pool8 +
              Pool9 +
              Pool10 +
              Pool11 +
              Pool12
          );
        })
        .then(msg => {
          msgauthor.send(
            '__**Raven Pools (Page 3 of 4)**__\n' +
              Pool13 +
              Pool14 +
              Pool15 +
              Pool16 +
              Pool17 +
              Pool18
          );
        })
        .then(msg => {
          msgauthor.send(
            '__**Raven Pools (Page 4 of 4)**__\n' + Pool19 + PoolEX
          );
        });
      msg.channel
        .send('Pools list sent via DM')
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
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'omegapool';
        if (msg.channel.id == '418896775638941721') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'minepool';
        if (msg.channel.id == '417872708907565058') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'ravenminer';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'threeeyed';
        if (msg.channel.id == '414961715592167434') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'cryptopoolparty';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'hash4life';
        if (msg.channel.id == '420312077488619531') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'krawww-miner.eu' ||
        messagetext == 'krawww-miner eu' ||
        messagetext == 'krawww-miner' ||
        messagetext == 'krawww miner' ||
        messagetext == 'krawww' ||
        messagetext == 'kraww' ||
        messagetext == 'kraw'
      ) {
        var Pool = Pool8;
        var Poolname = 'krawww-miner';
        if (msg.channel.id == '424655862863233034') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'yiimp';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'suprnova';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'masterhash';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'pool.theravencoinnest.com' ||
        messagetext == 'theravencoinnest.com' ||
        messagetext == 'theravencoinnest' ||
        messagetext == 'pool theravencoinnest com' ||
        messagetext == 'pool theravencoinnest' ||
        messagetext == 'the raven coin nest' ||
        messagetext == 'raven coin nest'
      ) {
        var Pool = Pool12;
        var Poolname = 'theravencoinnest';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'gorogoro';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'upthehash';
        if (msg.channel.id == '420834968420352000') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'iampool';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
        var Poolname = 'fubarpool';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'alttank.ca' ||
        messagetext == 'alttank ca' ||
        messagetext == 'alttank' ||
        messagetext == 'alt tank'
      ) {
        var Pool = Pool17;
        var Poolname = 'alttank';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'bsod.pw' ||
        messagetext == 'bsod pw' ||
        messagetext == 'bsod'
      ) {
        var Pool = Pool18;
        var Poolname = 'bsod';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
          msg.channel.send({
            embed
          });
          return;
        }
      }
      if (
        messagetext == 'kwchmining.com' ||
        messagetext == 'kwchmining com' ||
        messagetext == 'kwch mining' ||
        messagetext == 'kwch mining com' ||
        messagetext == 'kwch'
      ) {
        var Pool = Pool19;
        var Poolname = 'kwchmining';
        if (msg.channel.id == '###') {
          embed.setAuthor(
            Poolname + ' Options',
            'https://i.imgur.com/ZoakSOl.png'
          );
          embed.setDescription(Pool);
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
          .send('can not use this command here')
          .then(message => message.delete(5000));
        return;
      }
      embed.setAuthor(Poolname + ' Options', 'https://i.imgur.com/ZoakSOl.png');
      embed.setDescription(Pool);
      msg.channel.send({
        embed
      });
    }
  }
};
