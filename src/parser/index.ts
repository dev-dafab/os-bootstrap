
export {parse_depencencies} from "./dependency_parser"
export {parse_dotfiles_link} from "./dotfiles_parser"

/**
module.exports = (configFileObj: any) => {
  return {
    dotfiles: require("./dependency_parser.ts")(configFileObj.dependencies),
    dependencies: require("./dotfiles_parser.ts")(
      configFileObj["dotfiles installation"]
    )
  };
};
 **/
