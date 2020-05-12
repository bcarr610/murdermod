'use strict';

module.exports = (array, callback) => new Promise(async resolve => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
  resolve();
});
