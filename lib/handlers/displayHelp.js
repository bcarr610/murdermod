'use strict';

module.exports = (config, args, argConfig) => {
  console.log(`MurderMOD Help`.yellow);
  argConfig.forEach(arg => {
    if (arg.cmd && arg.handler) {
      const text = '\n'
      + `${`${arg.cmd}`.cyan}\n`
      + `${arg.description || ''}`
      console.log(text);
    }
  })
}
