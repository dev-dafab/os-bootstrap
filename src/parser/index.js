module.exports = configFileObj => {
  return {
    dotfiles: require("./dependency_parser.js")(configFileObj.dependencies),
    depencies: require("./dotfiles_parser.js")(
      configFileObj["dotfiles installation"]
    )
  };
};
