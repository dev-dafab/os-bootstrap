const { program } = require('commander');
const shelljs = require('shelljs');
const path = require('path');
const rootDir = require('app-root-dir');

program.option('-i, --input <type>', 'input files')

program.parse(process.argv);
const input = program.input;

const packagesDir = path.resolve(rootDir.get(), 'packages/*');


const ret = shelljs.ls('-d', packagesDir);
const dirs = ret.filter(e => typeof e === 'string');
console.log("============================================");
console.log("============================================");
console.log("============================================");
console.log(`rm ${input} in all submodules`);
console.log("============================================");
console.log("============================================");
console.log("============================================");
dirs.forEach(dir => shelljs.rm('-rf', `${dir}/${input}`));

