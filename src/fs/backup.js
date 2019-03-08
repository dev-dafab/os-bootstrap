const shell = require("shelljs");

function check_file_to_back_up() {}

function backup(backupdir) {
  const _backupdir = backupdir ? backupdir : shell.temp();
}

module.export = backup;
