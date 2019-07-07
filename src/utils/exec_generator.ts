const generator = {
  simpleGeneration: (dofilesObj: any, dependenciesObj: any, outputFileName?: string) => {
    return "echo 'link dotfiles'; "
      .concat(dofilesObj.join("; "))
      .concat("echo 'install dotfiles'; ".concat(dependenciesObj.join("; ")));
  }
};

export {generator};
