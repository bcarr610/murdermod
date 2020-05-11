'use strict';

const path = require('path');
const isDirectory = require('./isDirectory');
const forEach = require('../async/forEach');
const fs = require('fs').promises;

module.exports = async (directories) => await forEach(directories, async dir => {
  const resolved = path.resolve(dir);
  const isDir = await isDirectory(resolved);
  if (isDir) {
    return await fs.rmdir(path.resolve(resolved), { recursive: true });
  } else {
    throw `${resolved} is not a directory. NO_DELETE`;
  }
});
