let config = require('config');
let permRanks = config.get('moderation');
let priceBotChannels = config.get('pricebot');
let hashBotChannels = config.get('hashbot');
let statsBotChannels = config.get('statsbot');
let poolsBotChannels = config.get('poolsbot');

// Checks if user is allowed to use a command only for mods/team members
exports.hasPerms = function(msg) {
  return msg.member.roles.some(r => permRanks.perms.includes(r.name));
};

// Check if command was sent in dm
exports.inPrivate = function(msg) {
  return msg.channel.type == 'dm';
};

// Checks if Message was sent from a channel in priceBot Channels list
exports.hasPriceBotChannels = function(msg) {
  return priceBotChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in hashBot Channels list
exports.hasHashBotChannels = function(msg) {
  return hashBotChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in statsBot Channels list
exports.hasStatsBotChannels = function(msg) {
  return statsBotChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in poolsBot Channels list
exports.hasPoolsBotChannels = function(msg) {
  return poolsBotChannels.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a channel in statusBot Channels list
exports.hasStatusBotChannels = function(msg) {
  return statusBotChannels.channels.includes(msg.channel.id);
};
