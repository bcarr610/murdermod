'use strict';

const argConfig = require('./arg.config');

module.exports = (config, arg, args) => {
  const foundArg = argConfig.find(f => (
    typeof f.cmd === 'string'
      ? f.cmd.toLowerCase() === arg
      : f.cmd.map(v => v.toLowerCase()).includes(arg)
  ));

  if (foundArg && typeof foundArg.handler === 'function') {
    foundArg.handler(config, args, argConfig);
  } else {
    console.log(`${`${arg}`.cyan} is not a valid command.\nType ${`${config.bin} help`.green} for a list of valid commands.`)
  }
}
