"use strict";
exports.__esModule = true;
var program = require("commander");
program.version("0.0.1").command("osboot <arg>");
program
    .option("-d, --dotfiles-dir [dotfilesDir] <path>", "dotfiles directories")
    .option("-c, --config-file [configFile]  <path>", "config file")
    .parse(process.argv);
exports["default"] = {
    configFile: program.configFile,
    dotfilesDir: program.dotfilesDir
};
