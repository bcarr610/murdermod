const chalk = require('chalk');

module.exports = (title, list, color) => {
  console.log(
    `${chalk.underline(chalk[`${color || 'white'}Bright`](`${title}`))}`
    + `\r\n${list.map(f => `${chalk[`${color || 'white'}`](f)}`).join('\r\n')}\r\n`
  )
}
