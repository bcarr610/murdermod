#!/usr/bin/env node
'use strict';

const handlers = require('../handlers/murdermod');

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('add', 'Add new search/ignore criteria.', yargs => {
    return yargs
      .example('$0 add -p C:\\users\\username\\desktop', 'Add desktop to search paths.')
      .option('paths', {
        alias: 'p',
        describe: 'Path(s) to add to your search criteria.',
        type: 'array',
      })
      .option('ignoreKeywords', {
        alias: 'i',
        describe: 'Add keyword(s) for module search to ignore.',
        type: 'array',
      })
      .option('excludePaths', {
        alias: 'e',
        describe: 'Exclude path(s) from module search.',
        type: 'array',
      })
  }, handlers.add)
  .command(['remove', 'rm'], 'Remove search/ignore criteria.', yargs => {
    return yargs
      .example('$0 rm -p C:\\users\\username\\desktop -i .git')
      .option('paths', {
        alias: 'p',
        describe: 'Path(s) to remove from your search criteria. (Enter "*" to remove all).',
        type: 'array'
      })
      .option('ignoreKeywords', {
        alias: 'i',
        describe: 'Remove previously added keyword(s) from search ignore. (Enter "*" to remove all).',
        type: 'array',
      })
      .option('excludePaths', {
        alias: 'e',
        describe: 'Remove excluded path(s) from module search. (Enter "*" to remove all).',
        type: 'array',
      })
  }, handlers.remove)
  .command(['list', 'li', 'l'], 'List stored search data.', yargs => {
    return yargs
      .example('$0 list')
      .option('paths', {
        alias: 'p',
        describe: 'List stored paths.',
        type: 'boolean',
      })
      .option('ignoreKeywords', {
        alias: 'i',
        describe: 'List stored ignore keywords.',
        type: 'boolean',
      })
      .option('excludePaths', {
        alias: 'e',
        describe: 'List stored excluded paths.',
        type: 'boolean',
      })
  }, handlers.list)
  .command(['k', 'kill'], 'Delete node modules from search paths.', yargs => {
    return yargs
      .example('$0 kill')
      .option('noPrompt', {
        alias: 'n',
        describe: 'Don\'t display prompts.',
        type: 'boolean',
      })
      .option('snipe', {
        alias: 's',
        describe: 'Manually select modules to remove.',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Display verbose logs.',
        type: 'boolean',
      })
  }, handlers.kill)
  .help('h')
  .alias('h', 'help')
  .argv
