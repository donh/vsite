//  enable runtime transpilation to use ES6/7 in node
const babelRegister = require('babel-register');
const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');

try {
  const config = JSON.parse(babelrc);
  babelRegister(config);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}
