const discord = require('discord.js');
let inSpam = require('../helpers.js').inSpam;
let config = require('config');
let ChannelID = config.get('Channels').botspam;

exports.commands = [
  'serverstats' // command name that will be used for next lines of code below
];

exports.serverstats = {
  usage: '', //command usage like !demo <@username>, exclude !demo
  description: 'Displays server stats', //the description of command for !help command
  process: function(bot, msg, suffix) {
    if (inSpam(msg)) {
      var data = msg.guild;
      var ServerName = data.name;
      var ServerImg = data.iconURL;
      var ServerOwner = data.owner.user.username;
      var Members = data.memberCount;
      var Online = data.members.filter(m => m.presence.status === 'online')
        .size;
      var Away = data.members.filter(m => m.presence.status === 'idle').size;
      var Offline = Members - (Online + Away);
      var Emojis = data.emojis.size;
      var Roles = data.roles;
      var RolesList = Roles.map(g => g.name);
      var RolesArray = [];
      for (var i = 1; i <= Number(Roles.size) - 1; ++i) {
        RolesArray.push(
          RolesList[i] + ': ' + Roles.find('name', RolesList[i]).members.size
        );
      }
      const embed = new discord.RichEmbed();
      embed
        .addField('**Server Owner**: ', ServerOwner, true)
        .addField('**Emojis**: ', Emojis, true)
        .addField('**Total Users**: ', Members, true)
        .addField('**Online Users**: ', Online, true)
        .addField('**Idle Users**: ', Away, true)
        .addField('**Offline Users**: ', Offline, true)
        .addField('__** Total Roles**__:', Roles.size, false)
        .addField('*List of Servers Roles*', RolesArray, false)
        .setColor(7976557)
        .setAuthor(ServerName, ServerImg);
      msg.channel.send({ embed });
    } else {
      msg.channel
        .send('cannot use ths commad here')
        .then(message => message.delete(10000));
    }
  }
};
