const process = require('process');
const readline = require('readline');
const chalk = require('chalk');

module.exports = (question, color = 'cyan') => new Promise(resolve => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk[color](`${question} `), answer => {
    rl.close();
    resolve(answer);
  })
})
