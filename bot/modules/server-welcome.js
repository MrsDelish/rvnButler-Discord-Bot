let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;

exports.custom = ['onUserJoin'];
exports.onUserJoin = function(bot) {
  bot.on('guildMemberAdd', member => {
    member.send({
      embed: {
        title: '*Click here for more info about Raven!*',
        description:
          'This community allows Raven users to interact with the team directly and for us to engage users in order to grow Ravencoin ! \n\n' +
          '__**GROUND RULES**__\n' +
          '1. Be respectful to other community members. Harassment will not be tolerated \n' +
          '2. Do not spam, advertise or post referral links \n' +
          '3. Use appropriate channels for your discussions/questions. If you are looking for help with RAVEN, use #helpdesk, for price talk, use #market-and-price-discussion \n' +
          '4. #thenest discussions should be at least somewhat related to Raven. \n\n' +
          '__**Helpful hints & links**__\n' +
          '1. Type !tip help to interact with our Tipbot which can be used to send and receive Raven Coins (RVN). **Enable 2FA in your Discord account settings!** \n' +
          '2. Backing up your Raven wallet is your responsbility!\n' +
          '3. Are you a dev? Check out the #development channel \n' +
          '4. Check Pinned posts in each channel #rvn-mining has link to newest miners! \n\n' +
          '**Donations**\n' +
          'Development Donation Address: [RT2r9oGxQxbVE1Ji5p5iPgrqpNQLfc8ksH](https://rvn.hash4.life/address/RT2r9oGxQxbVE1Ji5p5iPgrqpNQLfc8ksH)\n' +
          '100% of collected funds will be used for things like new pools, added network tools for RVN, new mining clients, and further code development.\n\n' +
          'Marketing Donation Address: [RNwtuuLL1YCCHQhwY3nAoGqNkd1LSQFA1G](https://rvn.hash4.life/address/RNwtuuLL1YCCHQhwY3nAoGqNkd1LSQFA1G)\n' +
          '100% of collected funds will be used for things like running ads, translations, graphics, videos, and any other applicable needs.\n',
        fields: [
          {
            name: 'Official Site',
            value: '[ravencoin.org](https://ravencoin.org/)',
            inline: true
          },
          {
            name: 'Bitcointalk ANN Thread',
            value:
              '[topic=2752467.0](https://bitcointalk.org/index.php?topic=2752467.0)',
            inline: true
          },
          {
            name: 'x16r Whitepaper',
            value:
              '[PDF File](https://ravencoin.org/wp-content/uploads/2018/01/X16R-Whitepaper.pdf)',
            inline: true
          },
          {
            name: 'Block Explorer 1',
            value: '[threeeyed.info](http://threeeyed.info/)',
            inline: true
          },
          {
            name: 'Block Explorer 2',
            value: '[rvn.hash4.life](https://rvn.hash4.life/)',
            inline: true
          },
          {
            name: 'Raven Statistics',
            value: '[rvnstats.info](https://www.rvnstats.info/)',
            inline: true
          },
          {
            name: 'Wallets & Miners',
            value:
              '[Github Repo](https://github.com/MSFTserver/RavenCoin-Wallet-With-Miners/releases)',
            inline: true
          },
          {
            name: 'Ravencoin Wiki',
            value:
              '[Wiki mining](https://raven.wiki/wiki/Mining)',
            inline: true
          },
          {
            name: 'Community Forum',
            value:
              '[Forum](https://ravenforum.org/)',
            inline: true
          }
        ],
        url: 'https://bitcointalk.org/index.php?topic=2752467.0',
        color: 7976557,
        author: {
          name: 'Welcome to Raven Discord Community',
          icon_url: 'https://i.imgur.com/ZoakSOl.png'
        }
      }
    });
    member.send({
      embed: {
        description:
          '**Fake twitter account promising Ravencoin Airdrop, do not send any ETH.** \n' +
          'Feel free to help us by reporting the account->https://twitter.com/RavenCoinAirDrp',
        color: 13632027,
        author: {
          name: 'Known Scammers!',
          icon_url: 'https://i.imgur.com/ZoakSOl.png'
        }
      }
    });
  });
};

exports.commands = [
  'welcome' // command that is in this file, every command needs it own export as shown below
];

exports.welcome = {
  usage: '<@username>',
  description: 'send welcome message to specified user',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('command cannot be used in a DM');
      return;
    }
    if (suffix == '') {
      msg.channel.send('no user defined');
      return;
    }
    if (!hasPerms(msg)) {
      msg.channel.send('You Dont Have Permission To Use This Command!');
      return;
    }
    msg.mentions.members.first().send({
      embed: {
        title: '*Click here for more info about Raven!*',
        description:
          'This community allows Raven users to interact with the team directly and for us to engage users in order to grow Ravencoin ! \n\n' +
          '__**GROUND RULES**__\n' +
          '1. Be respectful to other community members. Harrasment will not be tolerated \n' +
          '2. Do not spam, advertise or post referral links \n' +
          '3. Use appropriate channels for your discussions/questions. If you are looking for help with RAVEN, use #helpdesk, for price talk, use #rotcex_trading \n' +
          '4. #thenest discussions should be at least somewhat related to Raven. \n\n' +
          '__**Helpful hints & links**__\n' +
          '1. Type !tip help to interact with our Tipbot which can be used to send and receive Raven Coins (RVN). **Enable 2FA in your Discord account settings!** \n' +
          '2. Backing up your Raven wallet is your responsbility!\n' +
          '3. Are you a dev? Check out the #development channel \n\n' +
          '**Donations**\n' +
          'Development Donation Address: [RT2r9oGxQxbVE1Ji5p5iPgrqpNQLfc8ksH](https://rvn.hash4.life/address/RT2r9oGxQxbVE1Ji5p5iPgrqpNQLfc8ksH)\n' +
          '100% of collected funds will be used for things like new pools, added network tools for RVN, new mining clients, and further code development.\n\n' +
          'Marketing Donation Address: [RNwtuuLL1YCCHQhwY3nAoGqNkd1LSQFA1G](https://rvn.hash4.life/address/RNwtuuLL1YCCHQhwY3nAoGqNkd1LSQFA1G)\n' +
          '100% of collected funds will be used for things like running ads, translations, graphics, videos, and any other applicable needs.\n',
        fields: [
          {
            name: 'Official Site',
            value: '[ravencoin.org](https://ravencoin.org/)',
            inline: true
          },
          {
            name: 'Bitcointalk ANN Thread',
            value:
              '[topic=2752467.0](https://bitcointalk.org/index.php?topic=2752467.0)',
            inline: true
          },
          {
            name: 'x16r Whitepaper',
            value:
              '[PDF File](https://ravencoin.org/wp-content/uploads/2018/01/X16R-Whitepaper.pdf)',
            inline: true
          },
          {
            name: 'Block Explorer 1',
            value: '[threeeyed.info](http://threeeyed.info/)',
            inline: true
          },
          {
            name: 'Block Explorer 2',
            value: '[rvn.hash4.life](https://rvn.hash4.life/)',
            inline: true
          },
          {
            name: 'Raven Statistics',
            value: '[rvnstats.info](https://www.rvnstats.info/)',
            inline: true
          },
          {
            name: 'Wallets & Miners',
            value:
              '[Github Repo](https://github.com/MSFTserver/RavenCoin-Wallet-With-Miners/releases)',
            inline: true
          }
        ],
        url: 'https://bitcointalk.org/index.php?topic=2752467.0',
        color: 7976557,
        author: {
          name: 'Welcome to Raven Discord Community',
          icon_url: 'https://i.imgur.com/ZoakSOl.png'
        }
      }
    });
    msg.mentions.members.first().send({
      embed: {
        description:
          '**Fake twitter account promising Ravencoin Airdrop, do not send any ETH.** \n' +
          'Feel free to help us by reporting the account->https://twitter.com/RavenCoinAirDrp',
        color: 13632027,
        author: {
          name: 'Known Scammers!',
          icon_url: 'https://i.imgur.com/ZoakSOl.png'
        }
      }
    });
  }
};
