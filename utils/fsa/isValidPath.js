const path = require('path');
const exists = require('./exists');

module.exports = async pathLike => {
  if (typeof pathLike !== 'string') {
    return false;
  }

  const resolved = path.resolve(pathLike);
  const pathExists = await exists(resolved);

  return pathExists;
}
