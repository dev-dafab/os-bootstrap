const yaml = require("js-yaml");
const fs = require("fs");
const util = require("util");

const readConfigFile = (filename = "./documentation/dotfile_config.yml") =>
  yaml.safeLoad(fs.readFileSync(filename));

const MAX_DEPTH = 2;

const isValidConfiguration = obj =>
  Array.isArray(obj) && obj.every(el => el.hasOwnProperty("src"));
const hasDestination = obj => obj.hasOwnProperty("destination");
const getFullInstallationCmdWithDestinationProvided = (cmd, src, dest) =>
  cmd.concat(src).concat(` ${dest}`);

// will assume home and src filename unchanged
const getFullInstallationCmdWithoutDestination = (cmd, src) =>
  getFullInstallationCmdWithDestinationProvided(cmd, src, `~/${src}`);

const getFullInstallationCmd = (cmd, entry) =>
  hasDestination(entry)
    ? getFullInstallationCmdWithDestinationProvided(
        cmd,
        entry.src,
        entry.destination
      )
    : getFullInstallationCmdWithoutDestination(cmd, entry.src);

const parseDotfilesLink = (configs, installation_cmd = "ln -s ") => {
  const keys = [];
  const ret = configs.map(entry => {
    const key = Object.keys(entry)[0];
    keys.push(key);
    return isValidConfiguration(entry[key])
      ? entry[key].map(el => getFullInstallationCmd(installation_cmd, el))
      : [];
  });

  return ret;
};

const config = readConfigFile()["dotfiles installation"];
const ret = parseDotfilesLink(config);
console.log("======================== final Ret ====================");
console.log(ret);
