'use strict';
const jsonfile = require('jsonfile');
const path = require('path');
const config = require('../../config');
const exists = require('../files/exists');
const fs = require('fs');

module.exports = async () => {
  const {
    path: dataPath,
    name,
    keys: {
      search,
      ignore
    }
  } = config.dataFile;
  const dirExists = await exists(dataPath);
  if (!dirExists) fs.mkdirSync(dataPath);
  const fileLocation = path.join(dataPath, name);
  jsonfile.writeFileSync(fileLocation, {
    [search]: [],
    [ignore]: [],
  });
  return;
}
