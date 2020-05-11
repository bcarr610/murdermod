'use strict';

module.exports = pathLike => {
  if (pathLike.includes('/')) {
    return pathLike.split('/').includes('node_modules');
  } else if (pathLike.includes('\\')) {
    return pathLike.split('\\').includes('node_modules');
  } else {
    return pathLike === 'node_modules';
  }
}
