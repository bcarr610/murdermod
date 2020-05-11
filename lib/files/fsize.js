'use strict';

const fsu = require('nodejs-fs-utils');

module.exports = pathLike => new Promise((resolve, reject) => {
  fsu.fsize(pathLike, (err, size) => {
    if (err) {
      reject(err);
    } else {
      resolve(size);
    }
  });
});
