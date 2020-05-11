'use strict';
const handlers = require('../lib/handlers');

module.exports = [
  {
    cmd: 'kill',
    description: 'Deletes all found module folders in specified paths.',
    handler: handlers.kill,
  },
  {
    cmd: 'add',
    description: 'Adds a new search path for node modules.',
    handler: handlers.addNewPath,
    args: [
      {
        name: 'Search Name',
        description: 'Name of the search path(s) to add. Add multiple paths by separating them with spaces.',
      }
    ],
  },
  {
    cmd: 'help',
    description: 'Displays all available commands.',
    handler: handlers.displayHelp,
  },
  {
    cmd: 'ignore',
    description: 'Add a string to ignore in search paths such as "src" or "public".',
    handler: handlers.addIgnoreText,
    args: [
      {
        name: 'Ignore Text',
        description: 'Text to ignore when searching for modules. Add multiple strings by separating them with spaces.'
      }
    ]
  },
  {
    cmd: 'remove',
    description: 'Removes a search path for node modules.',
    handler: handlers.removePath,
    args: [
      {
        name: 'Search Name',
        description: 'Name of the search path(s) to remove. Remove multiple paths by separating them with spaces.',
      }
    ]
  },
  {
    cmd: 'dontIgnore',
    description: 'Removes previously added ignore text from the list to ignore when searching node modules.',
    handler: handlers.removeIgnore,
    args: [
      {
        name: 'Ignore text',
        description: 'Text to remove from ignore list when searching for modules. Remove multiple strings by separating them with spaces.'
      }
    ]
  },
  {
    cmd: 'resetConfig',
    description: 'Completely removes saved configuration, this will remove all ignore items and search paths. Your data will be lost.',
    handler: handlers.resetConfig,
  },
  {
    cmd: 'list',
    description: 'Lists all search paths and ignore paths currently saved.',
    handler: handlers.listAll,
  },
  {
    cmd: ['v', 'version', 'ver'],
    description: 'List current murdermod version.',
    handler: handlers.showVersion,
  },
]
