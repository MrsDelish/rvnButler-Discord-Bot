var tcpp = require('tcp-ping');
let hasStatusBotChannels = require('../helpers.js').hasStatusBotChannels;

exports.commands = ['status'];

exports.status = {
  usage: '<URL> <port>',
  description: 'displays whether website or server is up or down',
  process: function(bot, msg, suffix) {
    words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    if (!hasStatusBotChannels) {
      msg.channel
        .send("can't use this command here")
        .then(message => message.delete(3000));
      return;
    }
    var Site = words[0];
    var SitePort = words[1];
    if (!Site || !SitePort) {
      msg.channel.send(
        'please provide a url and port to check\nExample: !status pool.threeeyed.info 3333'
      );
      return;
    }
    tcpp.ping(
      { address: Site, port: SitePort, attempts: 5, timeout: 2000 },
      function(err, data) {
        if (!data.avg) {
          msg.channel.send(data.address + ':' + data.port + ' is Down!');
        } else {
          msg.channel.send(
            data.address +
              ':' +
              data.port +
              ' is UP\n  average ping of ' +
              data.avg +
              '\n  Pinged 5 times!'
          );
        }
      }
    );
  }
};