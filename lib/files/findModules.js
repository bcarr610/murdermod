'use strict';
const path = require('path');
const readDir = require('./readDir');
const isDirectory = require('./isDirectory');
const forEach = require('../async/forEach');
const fsExists = require('./exists');

const isNodeModules = require('./isNodeModules');

const findModulesInDirectory = async (pathLike, ignorePaths) => {
  const resolvedPath = path.resolve(pathLike);
  const exists = await fsExists(resolvedPath);
  if (exists) {
    console.log(`Searching: ${resolvedPath}`.white);
    let modules = [];
    const isDir = await isDirectory(resolvedPath);
    const isModulesFolder = isNodeModules(resolvedPath);
  
    if (isDir && !isModulesFolder) {
      const items = await readDir(resolvedPath);
      if (items.length > 0) {
        let nestedModules = [];
        await forEach(items, async item => {
          const resolvedItemPath = path.resolve(resolvedPath, item);
          const splitPath = resolvedItemPath.includes('/')
            ? resolvedItemPath.split('/')
            : resolvedItemPath.includes('\\')
              ? resolvedItemPath.split('\\')
              : resolvedItemPath
          if (!splitPath.find(f => ignorePaths.includes(f))) {
            const foundModules = await findModulesInDirectory(path.join(pathLike, item), ignorePaths);
            nestedModules = [ ...nestedModules, ...foundModules ];  
          }
        });
        modules = [ ...modules, ...nestedModules ];
      }
    } else if (isModulesFolder) {
      console.log(`Found Modules: ${resolvedPath}`.green);
      modules.push(resolvedPath);
    }
    return modules;
  } else {
    throw `${paresolvedPaththLike} is not a valid path.`;
  }
}

module.exports = findModulesInDirectory;
