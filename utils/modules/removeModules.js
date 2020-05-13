const path = require('path');
const fsa = require('../fsa');
const asyncList = require('../asyncList');
const fs = require('fs').promises;

module.exports = async (directories) => await asyncList.forEach(directories, async dir => {
  const resolved = path.resolve(dir);
  const isDir = await fsa.isDir(resolved);
  if (isDir) {
    return await fs.rmdir(path.resolve(resolved), { recursive: true });
  } else {
    throw `${resolved} is not a directory. NO_DELETE`;
  }
});
