const process = require('process');
const path = require('path');

module.exports = {
  bin: 'murdermod',
  dataFile: {
    path: path.join(process.env.USERPROFILE, 'murdermod'),
    name: '_mmd.json',
    keys: {
      search: 'searchPaths',
      ignore: 'pathIgnore',
    }
  }
}