'use stict';

const getDataFile = require('../data/getDataFile');
const updateDataFile = require('../data/updateDataFile');
const forEach = require('../async/forEach');

module.exports = async (config, args, argConfig) => {
  const dataFile = await getDataFile();
  const textToAdd = args;
  
  if (textToAdd.length > 0) {
    const validText = [];
    const invalidText = [];
    await forEach(textToAdd, async tta => {
      validText.push(tta)
    });

    if (validText.length > 0) {
      const ignoreKey = config.dataFile.keys.ignore;

      await forEach(validText, vt => {
        if (dataFile[ignoreKey].includes(vt)) {
          console.log(`WARNING: ${vt} is already added.`.yellow);
          invalidText.push(vt);
        } else {
          dataFile[ignoreKey].push(vt);
        }
      });

      const actualTextToAdd = validText.filter(f => !invalidText.includes(f));
      
      if (actualTextToAdd.length > 0) {
        await updateDataFile(dataFile);
        console.log(`SUCCESS: Added ${validText.length} items to module ignore.`.green);
      } else {
        console.log(`WARNING: No text added`.yellow);
      }
      
    }
  } else {
    console.log(`ERROR: Expected a list of text ${textToAdd}`.red);
  }
}
