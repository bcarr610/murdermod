'use strict';
const fs = require('fs');
module.exports = pathLike => new Promise(resolve => fs.exists(pathLike, exists => resolve(exists)));