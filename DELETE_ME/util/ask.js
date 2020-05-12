'use strict';
const process = require('process');
const readline = require('readline');
const colors = require('colors');

module.exports = (question, color = 'cyan') => new Promise(resolve => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`${question}`[color], answer => {
    rl.close();
    resolve(answer);
  })
})
