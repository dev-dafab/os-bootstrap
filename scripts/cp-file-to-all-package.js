const { program } = require('commander');
const shelljs = require('shelljs');
const path = require('path');
const rootDir = require('app-root-dir');

program.option('-i, --input <file>', 'input files')
 .option('-o, --output <file>', 'output files')

program.parse(process.argv);
const input = program.input;
const output = program.output ? program.output : program.input;

const packagesDir = path.resolve(rootDir.get(), 'packages/*');
const inputFile = path.resolve(rootDir.get(), input);


const ret = shelljs.ls('-d', packagesDir);
const dirs = ret.filter(e => typeof e === 'string');
console.log("============================================");
console.log("============================================");
console.log("============================================");
console.log(`copy ${inputFile} into submodules`);
console.log("============================================");
console.log("============================================");
console.log("============================================");
   dirs.forEach(dir => shelljs.cp('-f', inputFile, `${dir}/${output}`));

