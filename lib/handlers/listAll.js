'use strict';

const getDataFile = require('../data/getDataFile');

module.exports = async (config) => {
  const { search, ignore } = config.dataFile.keys;
  const dataFile = await getDataFile();

  console.log(`Search Paths: ${dataFile[search].length}`.cyan);
  dataFile[search].forEach(f => console.log('[path]'.cyan + `${f}`.white));
  console.log(`\n\nText to Ignore ${dataFile[ignore].length}`.red);
  dataFile[ignore].forEach(f => console.log('[ignore]'.red + `${f}`.white));
  console.log('\n\n');
}
