'use strict';

const path = require('path');
const config = require('../../config');
const getDataFile = require('../data/getDataFile');
const forEach = require('../async/forEach');
const findModules = require('../files/findmodules');

module.exports = async (showLogs = true) => {
  const {
    keys: {
      search,
      ignore,
    }
  } = config.dataFile;
  const allModules = [];
  const dataFile = await getDataFile();
  const paths = dataFile[search];
  if (paths.length > 0) {
    const ignorePaths = dataFile[ignore];
    await forEach(paths, async searchPath => {
      const resolved = path.resolve(searchPath);
      const foundModules = await findModules(resolved, ignorePaths, showLogs);
      if (foundModules.length > 0) {
        foundModules.forEach(f => allModules.push(f));
      }
      return;
    });
  }
  return allModules;
}
