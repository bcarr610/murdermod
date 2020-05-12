'use strict';

const path = require('path');
const config = require('../../config');
const exists = require('../files/exists');

module.exports = async () => {
  const {
    path : dataPath,
    name,
  } = config.dataFile;
  const dataFilePath = path.join(dataPath, name);
  return await exists(dataFilePath);
}
