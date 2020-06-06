const generator = {
  simpleGeneration: (dofilesObj, dependenciesObj, outputFileName) => {
    return "echo 'link dotfiles'; "
      .concat(dofilesObj.join("; "))
      .concat("echo 'install dotfiles'; ".concat(dependenciesObj.join("; ")));
  }
};

module.exports = generator;
