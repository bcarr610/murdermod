'use strict';
const path = require('path');

const ask = require('../util/ask');
const findAllModules = require('../files/findAllModules');
const removeModules = require('../files/removeModules');
const forEach = require('../async/forEach');
const getDataFile = require('../data/getDataFile');
const config = require('../../config');

module.exports = async () => {
  const {
    keys: {
      search,
      ignore
    }
  } = config.dataFile;
  const dataFile = await getDataFile();
  const paths = dataFile[search];
  if (paths.length > 0) {
    const allModules = await findAllModules(true);
    if (allModules.length > 0) {
      console.clear();
      console.log(allModules.map((v, i) => `[${`${i}`.yellow}] ${v}`.white).join('\r\n'));
      console.log('\r\nPress '.cyan + 'ENTER'.green + ` to remove ${allModules.length > 1 ? `all ${allModules.length} module directories`.cyan : 'module directory'.cyan}`.cyan);
      console.log('Enter the corresponding numbers above seperated by spaces to remove specific modules'.yellow);

      const answer = await ask('Enter Selection (type "n" to cancel): ', 'cyan');
      const trimmedHandler = answer.trim().toLowerCase();
      if (trimmedHandler.length === 0) {
        console.clear();
        console.log(`Removing ${allModules.length} directories, please wait...`.cyan);
        const start = new Date().getTime();
        await removeModules(allModules);
        console.log(`Done [${((new Date().getTime() - start) / 1000).toFixed(2)}s]`.green);
      } else {
        if (trimmedHandler.match(/^[0-9 ]*$/gmi)) {
          const indexes = trimmedHandler.split(' ');
          const pathsToKill = allModules.filter((f, i) => indexes.includes(`${i}`));
          if (pathsToKill.length > 0) {
            console.log(`Removing ${pathsToKill.length} directories, please wait...`.cyan);
            const start = new Date().getTime();
            await removeModules(pathsToKill);
            console.log(`Done [${((new Date().getTime() - start) / 1000).toFixed(2)}s]`.green);  
          } else {
            console.log('Invalid paths selected'.red);
          }
        } else {
          console.log('Okay, not removing modules'.green);
        }
      }
    } else {
      console.log('No modules found in given directories'.cyan);
    }
  } else {
    console.log(`ERROR: No search paths added, type ${`${config.bin} a [path]`.cyan} ${'to add a search path.'.red}`.red);
  }
}
