const yaml = require("js-yaml");
const fs = require("fs");
const args = require("./src/parser/argv_parser");
const readConfigFile = filename => yaml.safeLoad(fs.readFileSync(filename));

if (!args.configFile) {
  process.exit(-1);
}

const configFileObj = readConfigFile(args.configFile);
const ret = require("./src/parser")(configFileObj);
console.log("=======================");
console.log(ret);

// generate exec file
const exec_generator = require("./src/utils/exec_generator.ts");
console.log(exec_generator.simpleGeneration(ret.dotfiles, ret.dependencies));
