'use strict';
const fs = require('fs');

module.exports = pathLike => new Promise((resolve, reject) => {
  fs.lstat(pathLike, (err, stats) => {
    if (err) reject(err);
    else resolve(stats.isDirectory())
  });
});
