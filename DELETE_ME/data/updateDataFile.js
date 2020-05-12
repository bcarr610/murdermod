'use strict';

const path = require('path');
const jsonfile = require('jsonfile');
const config = require('../../config');
const dataFileExists = require('./dataFileExists');
const createDataFile = require('./createDataFile');

module.exports = async newDataFileData => {
  const {
    path: dataFilePath,
    name: dataFileName,
  } = config.dataFile;

  const exists = await dataFileExists();
  if (!exists) await createDataFile();

  const dataPath = path.join(dataFilePath, dataFileName);

  jsonfile.writeFileSync(dataPath, newDataFileData);
  return;
}
