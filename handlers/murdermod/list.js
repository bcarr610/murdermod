const comm = require('../../comm');
const store = require('../../store');

module.exports = argv => {
  const {
    paths,
    ignoreKeywords,
    excludePaths,
  } = argv;

  const storedPaths = store.getPaths();
  const storedIgnoreKeywords = store.getIgnoreKeywords();
  const storedExcludePaths = store.getExcludedPaths();

  const totalStored = [
    ...(storedPaths || []),
    ...(storedIgnoreKeywords || []),
    ...(storedExcludePaths || []),
  ];

  if (totalStored.length === 0) {
    comm.warning('No saved configuration, check help for how to add configuration data.');
    return;
  }

  if (!paths && !ignoreKeywords && !excludePaths) {
    if (storedPaths && storedPaths.length) {
      comm.list(`Search Paths [${storedPaths.length}]`, storedPaths, 'cyan');
    }

    if (storedIgnoreKeywords && storedIgnoreKeywords.length) {
      comm.list(`Ignore Keywords [${storedIgnoreKeywords.length}]`, storedIgnoreKeywords, 'cyan');
    }

    if (storedExcludePaths && storedExcludePaths.length) {
      comm.list(`Exclude Paths [${storedExcludePaths.length}]`, storedExcludePaths, 'cyan');
    }
    return;
  }

  if (paths && storedPaths && storedPaths.length) {
    comm.list(`Search Paths [${storedPaths.length}]`, storedPaths, 'cyan');
  }

  if (ignoreKeywords && storedIgnoreKeywords && storedIgnoreKeywords.length) {
    comm.list(`Ignore Keywords [${storedIgnoreKeywords.length}]`, storedIgnoreKeywords, 'cyan');
  }

  if (excludePaths && storedExcludePaths && storedExcludePaths.length) {
    comm.list(`Exclude Paths [${storedExcludePaths.length}]`, storedExcludePaths, 'cyan');
  }

  return;
  
}