'use strict';

const displayHelp = require('./displayHelp');
const addNewPath = require('./addNewPath');
const addIgnoreText = require('./addIgnoreText');
const removePath = require('./removePath');
const removeIgnore = require('./removeIgnore');
const resetConfig = require('./resetConfig');
const listAll = require('./listAll');
const kill = require('./kill');
const showVersion = require('./showVersion');

module.exports = {
  displayHelp,
  addNewPath,
  addIgnoreText,
  removePath,
  removeIgnore,
  resetConfig,
  listAll,
  kill,
  showVersion,
}
