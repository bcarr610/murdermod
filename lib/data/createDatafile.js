'use strict';
const jsonfile = require('jsonfile');
const path = require('path');
const config = require('../../config');

module.exports = async () => {
  const {
    path: dataPath,
    name,
    keys: {
      search,
      ignore
    }
  } = config.dataFile;
  const fileLocation = path.join(dataPath, name);
  jsonfile.writeFileSync(fileLocation, {
    [search]: [],
    [ignore]: [],
  });
  return;
}
