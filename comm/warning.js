const chalk = require('chalk');

module.exports = (msg, showTag = true) => console.log(chalk.yellow((showTag ? '[WARNING] ' : '') + msg));
