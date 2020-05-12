'use strict';

const cp = require('child_process');
const localPackage = require('../../package.json');

module.exports = () => new Promise((resolve, reject) => {
  cp.exec(`npm update ${localPackage.name} -g`, (err, stdout, stderr) => {
    if (err) {
      reject(err);
    }

    console.log(stdout);
    console.error(stderr);
    resolve();
  });
})
