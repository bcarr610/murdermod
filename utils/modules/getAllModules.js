const path = require('path');
const asyncList = require('../asyncList');
const findModulesInDirectory = require('./findModulesInDirectory');

module.exports = async (searchPaths, ignoreKeywords, excludePaths, showLogs) => {
  const allModules = [];
  try {
    await asyncList.forEach(searchPaths, async searchPath => {
      const resovled = path.resolve(searchPath);
      const foundModules = await findModulesInDirectory(resovled, ignoreKeywords, excludePaths, showLogs);
      if (foundModules && foundModules.length > 0) {
        foundModules.forEach(f => allModules.push(f));
      }
      return;
    });
    return allModules;  
  } catch (err) {
    throw err;
  }
}