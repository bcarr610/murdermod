const path = require('path');
const fsa = require('../fsa');
const isModulesDirectory = require('./isModulesDirectory');
const comm = require('../../comm');
const asyncList = require('../asyncList');

const findModulesInDirectory = async (pathLike, ignoreKeywords, excludePaths, showLogs) => {
  try {
    const resolved = path.resolve(pathLike);
    const exists = await fsa.exists(resolved);
    if (exists) {
      comm.vLog(showLogs, `Searching: ${resolved}`);
      let modules = [];
      const isDir = await fsa.isDir(resolved);
      const isModule = isModulesDirectory(resolved);
  
      if (isDir && !isModule) {
        comm.vLog(showLogs, `Recursively searching ${resolved}`);
        const items = await fsa.readDir(resolved);
        if (items.length > 0) {
          let nestedModules = [];
          await asyncList.forEach(items, async item => {
            const resolvedItemPath = path.resolve(resolved, item);
            const splitPath = resolvedItemPath.includes('/')
              ? resolvedItemPath.split('/')
              : resolvedItemPath.includes('\\')
                ? resolvedItemPath.split('\\')
                : resolvedItemPath
            const hasIgnoreKeyword = ignoreKeywords ? splitPath.find(f => ignoreKeywords.includes(f)) : false;
            const isExcludedPath = excludePaths ? excludePaths.filter(f => resolvedItemPath.includes(f)).length > 0 : false;
  
            if (!hasIgnoreKeyword && !isExcludedPath) {
              const foundModules = await findModulesInDirectory(path.join(pathLike, item), ignoreKeywords, excludePaths, showLogs);
              nestedModules = [ ...nestedModules, ...foundModules ];
            }
          });
          modules = [ ...modules, ...nestedModules ];
        }
      } else if (isModule) {
        comm.vLog(showLogs, `Found Modules: ${resolved}`);
        modules.push(resolved);
      }
      return modules;
    } else {
      comm.error(`${resolved} is not a valid path.`);
    }  
  } catch (err) {
    throw err;
  }
}

module.exports = findModulesInDirectory;