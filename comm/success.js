const chalk = require('chalk');

module.exports = (msg, showTag = true) => {
  console.log(chalk.green((showTag ? '[SUCCESS] ' : '') + msg));
}
