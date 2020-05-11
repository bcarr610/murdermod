#!/usr/bin/env node
'use strict'
const createDataFile = require('../lib/data/createDataFile');
const controller = require('../controller');
const config = require('../config');
const dataFileExists = require('../lib/data/dataFileExists');
const displayHelp = require('../lib/handlers/displayHelp');
const argConfig = require('../controller/arg.config');

const _main = async () => {
  console.clear();
  const args = process.argv.splice(2, process.argv.length);

  const dataExists = await dataFileExists();
  if (!dataExists) {
    await createDataFile();
  }

  if (args.length > 0) {
    controller(
      config,
      args[0].trim().toLowerCase(),
      args.splice(1, args.length)
    )
  } else displayHelp(null, null, argConfig);
}

// Start app
_main()
