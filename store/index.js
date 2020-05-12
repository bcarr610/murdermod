'use strict';

const ConfigStore = require('configstore');
const packageJson = require('../package.json');

const config = new ConfigStore(packageJson.name);

const keys = {
  searchPaths: 'murdermod.kill.paths',
  ignoreWords: 'murdermod.kill.ignore.words',
  excludePaths: 'murdermod.kill.ignore.paths',
  lastKillDate: 'murdermod.kill.lastKillDate',
}

module.exports = {
  addPaths: (newPaths) => {
    const currentPaths = config.get(keys.searchPaths);
    config.set(keys.searchPaths, [
      ...(currentPaths || []),
      ...newPaths,
    ]);
  },
  removePaths: pathsToRemove => {
    const currentPaths = config.get(keys.searchPaths);
    config.set(keys.searchPaths, (currentPaths || []).filter(f => !pathsToRemove.includes(f)));
  },
  addIgnoreKeywords: newKeywords => {
    const currentKeywords = config.get(keys.ignoreWords);
    config.set(keys.ignoreWords, [
      ...(currentKeywords || []),
      ...newKeywords,
    ]);
  },
  removeIgnoreKeywords: keywordsToRemove => {
    const currentKeywords = config.get(keys.ignoreWords);
    config.set(keys.ignoreWords, (currentKeywords || []).filter(f => !keywordsToRemove.includes(f)));
  },
  addExcludePath: newPaths => {
    const currentPaths = config.get(keys.excludePaths);
    config.set(keys.excludePaths, [
      ...(currentPaths || []),
      ...newPaths,
    ]);
  },
  removeExcludePaths: pathsToRemove => {
    const currentPaths = config.get(keys.excludePaths);
    config.set(keys.excludePaths, (currentPaths || []).filter(f => !pathsToRemove.includes(f)));
  },
  getPaths: () => config.get(keys.searchPaths),
  getIgnoreKeywords: () => config.get(keys.ignoreWords),
  getExcludedPaths: () => config.get(keys.excludePaths),
}
