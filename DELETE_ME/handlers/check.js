'use strict';
const fsize = require('../files/fsize');
const findAllModules = require('../files/findAllModules');
const displayBytes = require('../util/displayBytes');
const forEach = require('../async/forEach');
const ask = require('../util/ask');
const kill = require('../handlers/kill');

module.exports = async () => {
  try {
    console.log('Finding module directories...'.cyan);
    const allModules = await findAllModules(false);
    console.log(`${allModules.length} module directories found.`.cyan);
    if (allModules.length > 0) {
      const sizes = [];
      console.log('Calculating size...');
      await forEach(allModules, async (modulePath, index) => {
        console.log(`[${index + 1} / ${allModules.length}] ${`${modulePath}`.white}`.cyan);
        const size = await fsize(modulePath);
        if (size) sizes.push(size);
      });
      const calculatedSize = sizes.reduce((p, c) => p += c, 0);
      console.log('_'.repeat(30));
      console.log('\nMurderMOD Check Results\n'.yellow);
      console.log(`${allModules.length} module directories found\n`.red);
      console.log(`${displayBytes(calculatedSize)} can be cleaned by running kill.\n`.red);
      const shouldKill = await ask('Kill Modules Now? (Y/N)', 'cyan');
      if (shouldKill.toLowerCase() === 'y') {
        kill();
        return;
      } else {
        console.log('Okay, not removing module directories'.yellow);
      }
    } else {
      console.log('All good, no module directories found!'.green);
    }
  } catch (err) {
    console.log(err);
  }
}
