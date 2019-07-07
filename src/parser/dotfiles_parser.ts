import {DotfileEntry, DotfileEntryDefinition} from "../models/dotfile-entry";

const isValidConfiguration = (obj: DotfileEntryDefinition[]) =>
  Array.isArray(obj) && obj.every(el => el.hasOwnProperty("src"));

function flatten(arr1: any[]): any[] {
  return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}

const hasDestination = (obj: DotfileEntryDefinition) => obj.hasOwnProperty("destination");
const getFullInstallationCmdWithDestinationProvided = (cmd: string, src: string, dest: string[]) =>
  dest.map(entry => cmd.concat(src).concat(` ${entry}`));

const getFullInstallationCmdWithoutDestination = (cmd: string, src: string) =>
  getFullInstallationCmdWithDestinationProvided(cmd, src, [`~/${src}`]);

const getFullInstallationCmd = (cmd: string, entry: DotfileEntryDefinition) =>
  hasDestination(entry)
    ? getFullInstallationCmdWithDestinationProvided(
        cmd,
        entry.src,
        entry.destination
      )
    : getFullInstallationCmdWithoutDestination(cmd, entry.src);

const parse_dotfiles_link = (configs: DotfileEntry[], installation_cmd = "ln -s ") => {
  return flatten(
    configs.map((entry: DotfileEntry) => {
    const key = Object.keys(entry)[0];
      return isValidConfiguration(entry[key] as DotfileEntryDefinition[])
      ? entry[key].map(el => getFullInstallationCmd(installation_cmd, el))
      : [];
    }))
    ;
};

export {parse_dotfiles_link};
