'use strict';

const fs = require('fs').promises;
const path = require('path');
const config = require('../../config');
const ask = require('../util/ask');

module.exports = async () => {
  const shouldRemove = await ask('Are you sure? This will remove all saved paths and ignore text. (Y/N)', 'red');
  if (shouldRemove.toLowerCase() === 'y') {
    const dataPath = path.join(config.dataFile.path, config.dataFile.name);
    await fs.unlink(dataPath);
    console.log('Successfully reset configuration'.green);
  } else {
    console.log('Did not reset configuration'.cyan);
  }
}
