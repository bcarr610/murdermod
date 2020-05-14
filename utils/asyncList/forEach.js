module.exports = (array, callback) => new Promise(async (resolve, reject) => {
  for (let i = 0; i < array.length; i++) {
    try {
      await callback(array[i], i, array);
    } catch (err) {
      reject(err);
    }
  }
  resolve();
});
