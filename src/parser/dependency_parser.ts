import {DependencyConf, DependencyEntry, OsInstallationConfig} from "../models/dependency-entry";
import {flatten} from "../utils/array_util";

const isArray = (obj: any) => Array.isArray(obj);

const hasInstallationCmd = (obj: OsInstallationConfig) => obj.hasOwnProperty("command");
const isOsSpecify = (obj: any) => obj.hasOwnProperty("name");
const isStandAloneDependency = (obj: any) => typeof obj === "string";
const isObject = (obj: DependencyConf) => typeof obj === "object";
const installCmdHadSpace = (cmd: string) => cmd.trim().length < cmd.length;
const maxDepthReached = (value: number) => value === 2;

const hasValidOsSpecificInstallation = (obj: any) => {
  if (!Object.hasOwnProperty("os")) {
    return false;
  }
  if (Array.isArray(isArray(obj))) {
    return obj.every((config: any) => isOsSpecify(config));
  }
  isOsSpecify(obj);
};

let depth = 0;

const parse_depencencies = (
  obj: DependencyEntry[],
  _installation_cmd = "apt-get install ",
  os_name = "linux"
): string[] => {
  const installation_cmd = installCmdHadSpace(_installation_cmd)
    ? _installation_cmd
    : _installation_cmd.concat(" ");

  let ret = obj
    .map((entry: any) => {
      if (isStandAloneDependency(entry)) {
        return installation_cmd.concat(entry);
      }

      if (isArray(entry)) {
        if (maxDepthReached(depth))
          throw new Error("MAX_DEPTH: please flaten your configuration file");
        depth++;
        return parse_depencencies(entry, _installation_cmd, os_name);
      }

      if (isObject(entry)) {
        const depencyName = Object.keys(entry)[0];
        const depency = entry[depencyName];
        if (hasValidOsSpecificInstallation(depencyName)) {
          return "";
        }

        const os_dependencies = depency["os"];
        if (!isArray(os_dependencies) && isObject(os_dependencies)) {
          const ret =
            os_dependencies["name"] === os_name
              ? hasInstallationCmd(os_dependencies)
                ? os_dependencies["command"]
                : installation_cmd.concat(depencyName)
                : "";
            return ret;
          }

          const cmd = os_dependencies.find((el: any) => el["name"] === os_name);
          if (!cmd) return "";
          const ret =
            cmd["name"] === os_name
              ? hasInstallationCmd(cmd)
              ? cmd["command"]
              : cmd.concat(depencyName)
              : "";
          return ret;
        }
  })
  return flatten(ret.filter(e => e));

};

export { parse_depencencies };
