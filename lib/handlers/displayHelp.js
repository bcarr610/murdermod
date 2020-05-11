'use strict';

module.exports = (config, args, argConfig) => {
  console.log(`MurderMOD Help`.yellow);
  argConfig.forEach(arg => {
    if (arg.cmd && arg.handler) {
      const text = '\n'
      + `${`${typeof arg.cmd === 'string' ? arg.cmd : arg.cmd.join(', ')}`.cyan}\n`
      + `${arg.description || ''}`
      console.log(text);
    }
  })
}
