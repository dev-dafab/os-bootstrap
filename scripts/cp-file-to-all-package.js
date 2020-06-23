const { program } = require('commander');
const shelljs = require('shelljs');
const path = require('path');
const rootDir = require('app-root-dir');

program.option('-i, --input <file>', 'input files')
 .option('-o, --output <file>', 'output files')
 .option('-i, --ignore <file>', 'inored modules')

program.parse(process.argv);
const input = program.input;
const output = program.output ? program.output : program.input;

const packagesDir = path.resolve(rootDir.get(), 'packages/*');
const ignoredPackages = program.ignore.split(',').map(e => e.trim());
    console.log(ignoredPackages);

const inputFile = path.resolve(rootDir.get(), input);

const ret = shelljs.ls('-d', packagesDir);
    const dirs = ret.filter(e => typeof e === 'string')
    .filter(e => !ignoredPackages.includes(e.split('/').pop()));

console.log("============================================");
console.log(`copy ${inputFile} into submodules`);
console.log("============================================");
dirs.forEach(dir => shelljs.cp('-f', inputFile, `${dir}/${output}`));

