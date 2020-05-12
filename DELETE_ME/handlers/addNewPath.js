'use stict';

const path = require('path');
const getDataFile = require('../data/getDataFile');
const updateDataFile = require('../data/updateDataFile');
const exists = require('../files/exists');
const isDir = require('../files/isDirectory');
const forEach = require('../async/forEach');

module.exports = async (config, args, argConfig) => {
  const dataFile = await getDataFile();
  const pathsToAdd = args;
  
  if (pathsToAdd.length > 0) {
    const validPaths = [];
    const invalidPaths = [];
    await forEach(pathsToAdd, async pta => {
      const resolvedPath = path.resolve(pta);
      const pathExists = await exists(resolvedPath);
      if (pathExists) {
        const pathIsDirectory = await isDir(resolvedPath);
        if (pathIsDirectory) validPaths.push(resolvedPath);
        else {
          console.log(`WARNING: ${resolvedPath} is not a directory`.yellow);
          invalidPaths.push(resolvedPath);
        }
      } else {
        console.log(`WARNING: ${pta} is an invalid path`.yellow);
        invalidPaths.push(pta);
      }
    });
    if (validPaths.length > 0) {
      const searchKey = config.dataFile.keys.search;

      await forEach(validPaths, vp => {
        if (dataFile[searchKey].includes(vp)) {
          console.log(`WARNING: ${vp} is already added.`.yellow);
          invalidPaths.push(vp);
        } else {
          dataFile[searchKey].push(vp);
        }
      });

      const actualPathsToAdd = validPaths.filter(f => !invalidPaths.includes(f));
      
      if (actualPathsToAdd.length > 0) {
        await updateDataFile(dataFile);
        console.log(`SUCCESS: Added ${validPaths.length} paths to module search.`.green);
      } else {
        console.log(`WARNING: No paths added`.yellow);
      }
      
    }
  } else {
    console.log(`ERROR: Expected a list of paths ${pathsToAdd}`.red);
  }
}
