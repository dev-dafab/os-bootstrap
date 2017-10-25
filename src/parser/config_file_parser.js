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

  return result;
}

function getDepenciesWithProvidedCommand(dependencies, os) {
  let result = [];
  let result1 = dependencies
    .filter(d => typeof d === "object")
    .filter(d => "os" in d)
    .filter(d => !Array.isArray(d["os"]))
    .filter(d => "name" in d["os"])
    .filter(d => d["os"]["name"] === os)
    .filter(d => "command" in d["os"])
    .map(d => {
      return {
        name: "Installation of: " + Object.keys(d)[0],
        command: d["os"]["command"]
      };
    });

  let result2 = dependencies
    .filter(d => typeof d === "object")
    .filter(d => "os" in d)
    .filter(d => Array.isArray(d["os"]))
    .map(d => d["os"])
    .map(d => {
      return d.find(f => os === f["name"]);
    })
    .map(d => {
      return {
        name: "Installation of ",
        command: d["command"]
      };
    });
  return result1.concat(result2);
}

function getOsSpecificDepencies(dependencies, installCommand, os) {
  const simpleDeps = dependencies.filter(d => typeof d === "string");
  const osDependencies = dependencies
    .filter(d => typeof d === "object" && !Array.isArray(d))
    .filter(d => "os" in d)
    .filter(d => d["os"]["name"] === os)
    .filter(d => !("command" in d["os"]))
    .map(d => Object.keys(d)[0]);
  let deps = simpleDeps.concat(osDependencies);
  deps = deps.map(d => {
    return {
      name: "Installation of " + d,
      command: installCommand + " " + d
    };
  });
  return deps;
}

function parseDepencencies(config, installCommand, os) {
  result = [];
  if (!config) {
    return null;
  }
  return getDepenciesWithProvidedCommand(config, os).concat(
    getOsSpecificDepencies(config, installCommand, os)
  );
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
  let ret = parseDepencencies(
    config["dependencies"],
    options.os.install_command,
    options.os.platform
  );

  console.log(ret);

  return api;
}

module.exports = config_file_parser;
