'use strict';

module.exports = (array, callback) => new Promise(async resolve => {
  const returnList = [];
  for (let i = 0; i < array.length; i++) {
    const isTrue = await callback(array[i], i, array);
    if (isTrue) returnList.push(array[i]);
  }
  resolve(returnList);
});
