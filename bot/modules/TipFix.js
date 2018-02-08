"use strict";
exports.commands = ["tip"];
exports.tip = {
  usage: "<subcommand>",
  description: "use rvnTipper to facilitate tipping!",
  process: function(bot) {
    return; // Tipping is now handled by the separate tipbot(in branch tipbot_dc), no need to to anything here...
  }
};
