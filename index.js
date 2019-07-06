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
