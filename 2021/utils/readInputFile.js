const fs = require('fs');
const path = require('path');

const readInputFile = async (dayNumber) =>
  fs.promises
    .readFile(path.resolve(__dirname, `../${dayNumber}-input.txt`), 'utf8')
    .then((result) => result.trim());

module.exports = { readInputFile };
