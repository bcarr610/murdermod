'use strict';

const localPackage = require('../../package.json');
const checkNewVersionAvailable = require('../util/checkNewVersionAvailable');

module.exports = async () => {
  try {
    const newVersionAvailable = await checkNewVersionAvailable();
    console.log(
      'MurderMod Details:\n'.yellow
      + `Version: ${localPackage.version}`.cyan
      + (
        newVersionAvailable
          ? ` [Update Available ${newVersionAvailable}]`.red
          : ' [Up To Date]'.green
      )
      + '\n'
      + `Author: ${localPackage.author}`.cyan
    )
  } catch (err) {
    console.log(
      'MurderMod Details:\n'.yellow
      + `Version: ${localPackage.version}`.cyan
      + '\n'
      + `Author: ${localPackage.author}`.cyan
    )
  }
}
