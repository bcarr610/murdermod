'use strict';

const updateModule = require('../util/updateModule');
const checkNewVersionAvailable = require('../util/checkNewVersionAvailable');
const localPackage = require('../../package.json');

module.exports = async () => {
  console.log('Checking for updates...'.cyan);
  try {
    const cv = localPackage.version;
    const nv = await checkNewVersionAvailable();
    if (nv) {
      console.log('New Version Available!'.green);
      console.log(`${cv} --> ${nv}`);
      console.log(`Updating ${localPackage.name} to v${nv}...`);
      await updateModule();
      console.log(`Done!`.green);
    } else {
      console.log(`${localPackage.name} v${cv} is already up to date`);
    }
  } catch (err) {
    console.log('Failed to update Module'.red);
    console.error(err);
  }
}
