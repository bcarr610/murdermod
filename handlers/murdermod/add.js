'use strict';

const path = require('path');
const chalk = require('chalk');
const store = require('../../store');
const fsa = require('../../utils/fsa');
const comm = require('../../comm');

module.exports = async argv => {
  const pathsToAdd = [];
  const keywordsToAdd = [];
  const excludedPathsToAdd = [];
  
  const {
    paths,
    ignoreKeywords,
    excludePaths,
  } = argv;

  if (!paths && !ignoreKeywords && !excludePaths) {
    comm.error('Must provide at least one path, keyword or exclude path.');
    return;
  }

  const storedPaths = store.getPaths();
  const storedKeywords = store.getIgnoreKeywords();
  const storedIgnorePaths = store.getExcludedPaths();

  if (paths) {
    for (let i = 0; i < paths.length; i++) {
      const isValid = await fsa.isValidPath(paths[i]);
      if (isValid) {
        const trimmed = paths[i].trim();
        const resolved = path.resolve(trimmed);
        const isStoredAlready = storedPaths ? storedPaths.find(f => f === resolved) : false;
        if (isStoredAlready) {
          comm.warning(`${trimmed} already stored.`);
        } else {
          const isDir = await fsa.isDir(resolved);
          if (isDir) {
            if (storedIgnorePaths && storedIgnorePaths.includes(resolved)) {
              comm.warning(`${trimmed} cannot be added to search until it is removed from excluded paths.`);
            } else {
              pathsToAdd.push(resolved);
            }
          } else {
            comm.warning(`${trimmed} is not a directory.`);
          }
        }
      } else {
        comm.warning(`${paths[i]} is not a valid path.`);
      }
    }
  }

  if (ignoreKeywords) {
    ignoreKeywords.forEach(f => {
      const trimmed = f.trim();
      if (storedKeywords && storedKeywords.includes(trimmed)) {
        comm.warning(`"${trimmed}" already stored.`);
      } else keywordsToAdd.push(trimmed);
    });
  }

  if (excludePaths) {
    for (let i = 0; i < excludePaths.length; i++) {
      const isValid = await fsa.isValidPath(excludePaths[i]);
      if (isValid) {
        const trimmed = excludePaths[i].trim();
        const resolved = path.resolve(trimmed);
        const isStoredAlready = storedIgnorePaths ? storedIgnorePaths.find(f => f === resolved) : false;
        if (isStoredAlready) {
          comm.warning(`${trimmed} already stored.`);
        } else {
          const isDir = await fsa.isDir(resolved);
          if (isDir) {
            if (storedPaths && storedPaths.includes(resolved)) {
              comm.warning(`${trimmed} cannot be excluded until it is removed from search path.`);
            } else {
              excludedPathsToAdd.push(resolved);
            }
          } else {
            comm.warning(`${trimmed} is not a directory.`);
          }
        }
      } else {
        comm.warning(`${excludePaths[i]} is not a valid path.`);
      }
    }
  }

  if (pathsToAdd.length > 0) {
    store.addPaths(pathsToAdd);
    comm.list(`Added ${pathsToAdd.length} search paths`, pathsToAdd, 'green')
  }

  if (keywordsToAdd.length > 0) {
    store.addIgnoreKeywords(keywordsToAdd);
    comm.list(`Added ${keywordsToAdd.length} ignore keywords`, keywordsToAdd, 'green');
  }

  if (excludedPathsToAdd.length > 0) {
    store.addExcludePath(excludedPathsToAdd);
    comm.list(`Added ${excludedPathsToAdd.length} excluded paths`, excludedPathsToAdd, 'green');
  }
  
}
