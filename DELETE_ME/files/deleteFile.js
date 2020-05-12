'use strict';
const fs = require('fs');

module.exports = pathLike => new Promise((resolve, reject) => {
  fs.unlink(pathLike, err => {
    if (err) reject(err);
    else resolve();
  });
});
