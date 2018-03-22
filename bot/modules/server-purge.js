let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;

exports.commands = [
  'purge' // command that is in this file, every command needs it own export as shown below
];

exports.purge = {
  usage: '<number of messages>',
  description: 'Deletes Messages',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Cant Purge Message In DMs!');
      return;
    }
    if (hasPerms(msg)) {
      if (!suffix) {
        var newamount = '2';
      } else {
        var amount = Number(suffix);
        var adding = 1;
        var newamount = amount + adding;
      }
      let messagecount = newamount.toString();
      msg.channel
        .fetchMessages({
          limit: messagecount
        })
        .then(messages => {
          msg.channel.bulkDelete(messages);
          // Logging the number of messages deleted on both the channel and console.
          msg.channel
            .send(
              'Deletion of messages successful. \n Total messages Purged: ' +
                Number(newamount -
                1)
            )
            .then(message => message.delete(10000));
        })
        .catch(err => {
          msg.channel
            .send('ERROR deleting ' + newamount - 1 + ' messages!')
            .then(message => message.delete(10000));
        });
    } else {
      msg.channel
        .send('only moderators can use this command!')
        .then(message => message.delete(10000));
    }
  }
};
