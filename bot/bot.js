'use strict';

// Load up libraries
const Discord = require('discord.js');
let _ = require('underscore-node');
// Load config!
let config = require('config');
let LogChannel = config.get('moderation').logchannel;
config = config.get('bot');

//load modules
const commandsV2 = require('./modules/commandsV2.js');

var aliases;
var commands = {};
// check if any aliases are defined
try {
  aliases = require('./alias.json');
} catch (e) {
  console.log('no aliases in /bot/alias.json');
}

var bot = new Discord.Client();

//run when bot is activated in server
bot.on('ready', function() {
  console.log(
    'Logged in! Serving in ' + bot.guilds.array().length + ' servers'
  );
  require('./plugins.js').init();
  console.log('type ' + config.prefix + 'help in Discord for a commands list.');
  bot.user.setActivity(config.prefix + 'help');
  bot.channels.get(LogChannel).send('Bot Activated :rocket:' +
  '\n-------------------------------------------------\n');
});

//initialize the commandsBot
commandsV2.init(bot);

bot.on('disconnected', function() {
  console.log('Disconnected!');
  process.exit(1); //exit node.js with an error
});

bot.on('error', function(error) {
  console.log(error);
  process.exit(1); //exit node.js with an error
});

function checkMessageForCommand(msg, isEdit) {
  //check if message is a command
  if (msg.author.id != bot.user.id && msg.content.startsWith(config.prefix)) {
    console.log(
      'treating ' +
        msg.content +
        ' from UserName: ' +
        msg.author.username +
        ' as command'
    );
    //check if user is Online
    if (!msg.member){
      msg.channel.send('Please set your Discord Presence to Online to talk to the Bot!')
    }
    var cmdTxt = msg.content
      .split(' ')[0]
      .substring(config.prefix.length)
      .toLowerCase();
    var suffix = msg.content
      .substring(cmdTxt.length + config.prefix.length + 1); //add one for the ! and one for the space
    if (msg.isMentioned(bot.user)) {
      try {
        cmdTxt = msg.content.split(' ')[1].toLowerCase();
        suffix = msg.content
          .substring(
            bot.user.mention().length + cmdTxt.length + config.prefix.length + 1
          );
      } catch (e) {
        //no command
        msg.channel.send('Yes?');
        return;
      }
    }
    let alias = aliases[cmdTxt];
    if (alias) {
      var cmd = commands[alias];
    } else {
      var cmd = commands[cmdTxt];
    }
    if (cmdTxt === 'help') {
      //help is special since it iterates over the other commands
      if (suffix) {
        var cmds = suffix.split(' ').filter(function(cmd) {
          if (aliases[cmd]) {
            cmd = aliases[cmd];
            return commands[cmd];
          } else {
            return commands[cmd];
          }
        });
        var info = '';
        for (var i = 0; i < cmds.length; i++) {
          var cmd = cmds[i];
          if (aliases[cmd]) {
            cmd = aliases[cmd];
          }
          info += '**' + config.prefix + cmd + '**';
          var usage = commands[cmd].usage;
          if (usage) {
            info += ' ' + usage;
          }
          var description = commands[cmd].description;
          if (description instanceof Function) {
            description = description();
          }
          if (description) {
            info += '\n\t' + description;
          }
          info += '\n';
        }
        var aliasnames = [];
        _.groupBy(aliases, function(key, value) {
          if (key == cmd) {
            aliasnames.push(value);
          }
        });
        var aliasnames = JSON.stringify(aliasnames)
          .replace(']', '')
          .replace('[', '');
        if (info || cmd) {
          msg.channel.send(
            info + '**Other Activators**: \n"' + cmd + '",' + aliasnames
          );
        }
      } else {
        msg.author.send('**Available Commands:**').then(function() {
          var batch = '';
          var sortedCommands = Object.keys(commands).sort();
          for (var i in sortedCommands) {
            var cmd = sortedCommands[i];
            var info = '**' + config.prefix + cmd + '**';
            var usage = commands[cmd].usage;
            if (usage) {
              info += ' ' + usage;
            }
            var description = commands[cmd].description;
            if (description instanceof Function) {
              description = description();
            }
            if (description) {
              info += '\n\t' + description;
            }
            var newBatch = batch + '\n' + info;
            if (newBatch.length > 1024 - 8) {
              //limit message length
              msg.author.send(batch);
              batch = info;
            } else {
              batch = newBatch;
            }
          }
          if (batch.length > 0) {
            msg.author.send(batch);
          }
        });
      }
    } else if (cmd) {
      // Add permission check here later on ;)
      try {
        cmd.process(bot, msg, suffix, isEdit);
      } catch (e) {
        var msgTxt = 'command ' + cmdTxt + ' failed :(';
        var linebreak = '\n-------------------------------------------------\n';
        if (config.debug) {
          msgTxt += '\n' + e.stack;
        }
        bot.channels.get(LogChannel).send(msgTxt + linebreak);
      }
    } else {
      return;
    }
  } else {
    //message isn't a command or is from us
    //drop our own messages to prevent feedback loops
    if (msg.author == bot.user) {
      return;
    }

    if (msg.author != bot.user && msg.isMentioned(bot.user)) {
      msg.channel.send('yes?'); //using a mention here can lead to looping
    } else {
      return;
    }
  }
}

bot.on('message', msg => checkMessageForCommand(msg, false));
bot.on('messageUpdate', (oldMessage, newMessage) => {
  checkMessageForCommand(newMessage, true);
});

exports.addCommand = function(commandName, commandObject) {
  try {
    commands[commandName] = commandObject;
  } catch (err) {
    console.log(err);
  }
};
exports.addCustomFunc = function(customFunc) {
  try {
    customFunc(bot);
  } catch (err) {
    console.log(err);
  }
};
exports.commandCount = function() {
  return Object.keys(commands).length;
};
bot.login(config.token);
