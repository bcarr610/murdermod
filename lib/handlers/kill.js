'use strict';
const path = require('path');

const ask = require('../util/ask');
const findModules = require('../files/findModules');
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
  let allModules = [];
  const dataFile = await getDataFile();
  const paths = dataFile[search];
  if (paths.length > 0) {
    const ignorePaths = dataFile[ignore];
    await forEach(paths, async searchPath => {
      const resolved = path.resolve(searchPath);
      const foundModules = await findModules(resolved, ignorePaths);
      if (foundModules.length > 0) {
        allModules = [ ...allModules, ...foundModules ];
      }
      return;
    });
    if (allModules.length > 0) {
      console.clear();
      console.log(allModules.map((v, i) => `${i}. ${v}`).join('\r\n'));
      const shouldClear = await ask(`Found ${allModules.length} module directories, Delete? (y/n)`, 'yellow');
      if (shouldClear.toLowerCase().includes('y')) {
        console.clear();
        console.log(`Removing ${allModules.length} directories, please wait...`.cyan);
        const start = new Date().getTime();
        await removeModules(allModules);
        console.log(`Done [${((new Date().getTime() - start) / 1000).toFixed(2)}s]`.green);
      } else {
        console.log('Okay, not removing modules'.green);
      }
    } else {
      console.log('No modules found in given directories'.cyan);
    }
  } else {
    console.log(`ERROR: No search paths added, type ${`${config.bin} a [path]`.cyan} ${'to add a search path.'.red}`.red);
  }
}
