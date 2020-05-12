'use strict';

const path = require('path');
const jsonfile = require('jsonfile');
const config = require('../../config');
const dataFileExists = require('./dataFileExists');
const createDataFile = require('./createDataFile');

module.exports = async () => {
  const fileExists = await dataFileExists();
  if (!fileExists) await createDataFile();
  const {
    path : dataPath,
    name,
  } = config.dataFile;
  const resolvedDataPath = path.join(dataPath, name);
  return jsonfile.readFileSync(resolvedDataPath);
}
