'use stict';

const path = require('path');
const getDataFile = require('../data/getDataFile');
const updateDataFile = require('../data/updateDataFile');

module.exports = async (config, args, argConfig) => {
  const dataFile = await getDataFile();
  const toRemove = args.map(v => path.resolve(v));
  
  if (toRemove.length > 0) {
    const key = config.dataFile.keys.search;
    const newDataFile = { ...dataFile };
    newDataFile[key] = dataFile[key].filter(f => !toRemove.includes(path.resolve(f)));

    if (dataFile[key].length !== newDataFile[key].length) {
      await updateDataFile(newDataFile);
      console.log(`SUCCESS: Removed ${dataFile[key].length - newDataFile[key].length} from module search.`.green);
    } else {
      console.log(`WARNING: Nothing to remove`.yellow);
    }
      
  } else {
    console.log(`ERROR: Expected a list of path(s) ${toRemove}`.red);
  }
}
