module.exports = {
  bin: 'murdermod',
  dataFile: {
    path: __dirname,
    name: '_mmd.json',
    keys: {
      search: 'searchPaths',
      ignore: 'pathIgnore',
    }
  }
}