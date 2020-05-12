'use stict';

const getDataFile = require('../data/getDataFile');
const updateDataFile = require('../data/updateDataFile');

module.exports = async (config, args, argConfig) => {
  const dataFile = await getDataFile();
  const toRemove = args;
  
  if (toRemove.length > 0) {
    const key = config.dataFile.keys.ignore;
    const newDataFile = { ...dataFile };
    newDataFile[key] = dataFile[key].filter(f => !toRemove.includes(f));

    if (dataFile[key].length !== newDataFile[key].length) {
      await updateDataFile(newDataFile);
      console.log(`SUCCESS: Removed ${dataFile[key].length - newDataFile[key].length} from module ignore.`.green);
    } else {
      console.log(`WARNING: Nothing to remove`.yellow);
    }
      
  } else {
    console.log(`ERROR: Expected a list of text ${toRemove}`.red);
  }
}
