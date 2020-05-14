'use strict';

const path = require('path');
const store = require('../../store');
const comm = require('../../comm');
const fsa = require('../../utils/fsa');

module.exports = async argv => {
  let pathsToRemove = [];
  let keywordsToRemove = [];
  let excludedPathsToRemove = [];

  const {
    paths,
    ignoreKeywords,
    excludePaths,
  } = argv;

  const storedPaths = store.getPaths();
  const storedKeywords = store.getIgnoreKeywords();
  const storedExcludedPaths = store.getExcludedPaths();

  if (!paths && !ignoreKeywords && !excludePaths) {
    if (argv._.includes('*')) {
      if (storedPaths) pathsToRemove = [ ...storedPaths ];
      if (storedKeywords) keywordsToRemove = [ ...storedKeywords ];
      if (storedExcludedPaths) excludedPathsToRemove = [ ...storedExcludedPaths ];
    } else {
      comm.error('Must provide at least one path, keyword or exclude path.');
      return;
    }
  }

  if (paths) {
    if (paths[0].trim() === '*') {
      if (storedPaths) {
        pathsToRemove = [ ...storedPaths ];
      } else {
        comm.warning('No stored search paths configured.');
      }
    } else {
      for (let i = 0; i < paths.length; i++) {
        const isValid = await fsa.isValidPath(paths[i]);
        if (isValid) {
          const trimmed = paths[i].trim();
          const resolved = path.resolve(trimmed);
          const isStoredAlready = storedPaths ? storedPaths.find(f => f === resolved) : false;
          if (!isStoredAlready) {
            comm.warning(`${trimmed} not found in stored search paths.`);
          } else {
            const isDir = await fsa.isDir(resolved);
            if (isDir) {
              pathsToRemove.push(resolved);
            } else {
              comm.warning(`${trimmed} is not a directory.`);
            }
          }
        } else {
          comm.warning(`${paths[i]} is not a valid path.`);
        }
      }
  
    }
  }

  if (ignoreKeywords) {
    if (storedKeywords) {
      if (ignoreKeywords[0].trim() === '*') {
        keywordsToRemove = [ ...storedKeywords ];
      } else {
        ignoreKeywords.forEach(f => {
          const trimmed = f.trim();
          if (storedKeywords.includes(trimmed)) {
            keywordsToRemove.push(trimmed);
          } else {
            comm.warning(`${trimmed} not found in stored ignore keywords.`);
          }
        });
  
      }
    } else {
      comm.error('No stored ignore keywords, add ignore keywords first before you can remove them.');
    }
  }

  if (excludePaths) {
    if (excludePaths[0].trim() === '*') {
      if (storedExcludedPaths) {
        excludedPathsToRemove = [ ...excludePaths ];
      }
    } else {
      for (let i = 0; i < excludePaths.length; i++) {
        const isValid = await fsa.isValidPath(excludePaths[i]);
        if (isValid) {
          const trimmed = excludePaths[i].trim();
          const resolved = path.resolve(trimmed);
          const isStoredAlready = storedExcludedPaths ? storedExcludedPaths.find(f => f === resolved) : false;
          if (!isStoredAlready) {
            comm.warning(`${trimmed} not found in stored exclude paths.`);
          } else {
            const isDir = await fsa.isDir(resolved);
            if (isDir) {
              excludedPathsToRemove.push(resolved);
            } else {
              comm.warning(`${trimmed} is not a directory.`);
            }
          }
        } else {
          comm.warning(`${excludePaths[i]} is not a valid path.`);
        }
      }
  
    }
  }

  if (pathsToRemove.length > 0) {
    store.removePaths(pathsToRemove);
    comm.list(`Removed ${pathsToRemove.length} search paths`, pathsToRemove, 'green');
  }

  if (keywordsToRemove.length > 0) {
    store.removeIgnoreKeywords(keywordsToRemove);
    comm.list(`Removed ${keywordsToRemove.length} ignore keywords`, keywordsToRemove, 'green');
  }

  if (excludedPathsToRemove.length > 0) {
    store.removeExcludePaths(excludedPathsToRemove);
    comm.list(`Removed ${excludedPathsToRemove.length} excluded paths`, excludedPathsToRemove, 'green');
  }
  
}
