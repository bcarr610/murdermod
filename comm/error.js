const chalk = require('chalk');

module.exports = (msg, showTag = true, fatal = false) => {
  console.log(chalk.red((fatal ? 'FATAL ERROR! ' : '') + (showTag ? '[ERROR] ' : '') + msg));
}
