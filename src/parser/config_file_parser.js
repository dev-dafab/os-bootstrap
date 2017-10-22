const yaml = require("js-yaml");
const fs = require("fs");
const util = require("util");

function readConfigFile(filename) {
  return yaml.safeLoad(fs.readFileSync(filename, "utf8"));
}

function parseDotfilesLink(config, dotfilesDir) {
  /**
   *  {name: "installation of foo/bar": commands: ['ln -s foo', 'ln -s bar']}
   */
  let name = `Installation of ${0}`;
  let command = `ln -s ${0} ${1}`;
  let result = [];

  config.forEach(entry => {
    Object.keys(entry).forEach(_entry => {
      let _name = name;
      _name = _name.replace(0, _entry);

      let _directory;
      let _commands = [];

      if ("directory" in entry[_entry]) {
        _directory = dotfilesDir + "/" + entry[_entry]["directory"];
        if (Array.isArray(entry[_entry]["directories"])) {
          _commands = _commands.concat(
            entry[_entry]["directories"].map(f => {
              let _command = command;
              _command = _command.replace(0, _directory).replace(1, f);
              return _command;
            })
          );
        }
      }

      if ("file" in entry[_entry]) {
        _directory = dotfilesDir + "/" + entry[_entry]["file"];
        if (Array.isArray(entry[_entry]["files"])) {
          _commands = _commands.concat(
            entry[_entry]["files"].map(f => {
              let _command = command;
              _command = _command.replace(0, _directory).replace(1, f);
              return _command;
            })
          );
        }
      }

      result = result.concat({ name: _name, commands: _commands });
    });
  });

  console.log(result);
}

const api = {};

function config_file_parser(options) {
  let install_command = options.os.install_command;
  if (!install_command) {
    throw new Error("Run Command required");
  }

  let configFile = options.program["configFile"];
  if (!configFile) {
    throw new Error("No Config File");
  }

  let dotfilesDir = options.program["dotfilesDir"];
  if (!dotfilesDir) {
    throw new Error("No dotfiles directory");
  }

  let config = readConfigFile(configFile);
  parseDotfilesLink(config["dotfiles installation"], dotfilesDir);

  return api;
}

module.exports = config_file_parser;
