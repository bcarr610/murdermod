'use strict'

const localPackage = require('../../package.json');
const NPMAPI = require('npm-api');

module.exports = async () => {
  try {
    const npm = new NPMAPI();
    const repo = npm.repo(localPackage.name);
    const remotePackage = await repo.package();
    const { version: remoteVersion } = remotePackage;
    const localSplit = localPackage.version.split('.');
    const remoteSplit = remoteVersion.split('.');
    return (
      remoteSplit
        .filter((f, i) => (
          parseInt(f) > parseInt(localSplit[i])
        )).length > 0
          ? remoteVersion
          : false
        )
  } catch (err) {
    throw err;
  }
}
