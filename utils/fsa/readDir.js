const fs = require('fs');

module.exports = (pathLike) => new Promise((resolve, reject) => {
  fs.readdir(pathLike, (err, files) => {
    if (err) reject(err);
    else resolve(files);
  });
});
