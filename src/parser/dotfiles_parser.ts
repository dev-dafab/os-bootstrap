import {DotfileEntry, DotfileEntryDefinition} from "../models/dotfile-entry";
import {flatten} from "../utils/array_util";

const isValidConfiguration = (obj: DotfileEntryDefinition[]) =>
  Array.isArray(obj) && obj.every(el => el.hasOwnProperty("src"));

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

const parse_dotfiles_link = (configs: DotfileEntry[], installation_cmd = "ln -s "): string[] => {
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
