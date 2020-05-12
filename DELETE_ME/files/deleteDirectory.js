'use strict';
const fs = require('fs');

module.exports = pathLike => new Promise((resolve, reject) => {
  fs.rmdir(pathLike, err => {
    if (err) reject(err);
    else resolve();
  });
});
