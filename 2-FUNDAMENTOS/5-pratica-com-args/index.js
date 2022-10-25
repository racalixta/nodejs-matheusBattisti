//  node .\index.js --a=5 --b=3

const minimist = require('minimist');
const soma = require('./soma').soma;

console.log('\n---------------------------\n');

// exteno
const args = minimist(process.argv.slice(2));

// interno

const a = parseInt(args['a']);

const b = parseInt(args['b']);

soma(a, b)


console.log('\n---------------------------\n');
