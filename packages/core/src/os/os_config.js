const os = require('os')
const fs = require('fs')
const shelljs = require('shelljs')

function getOsInstallCommand () {
  if (os.platform() === 'darwin') {
    return 'brew install '
  } else {
    return 'sudo apt-get install -y '
  }
}

function getBackupDir () {
  const dateNow = new Date(Date.now())
  return (
    os.homedir() +
        '/dotfiles_backup_' +
        dateNow.toLocaleDateString() +
        '_' +
        dateNow.toLocaleTimeString()
  )
}

function getAvailableShells () {
  const shells = fs
    .readFileSync('/etc/shells', { encoding: 'utf8' })
    .split('\n')
    .filter((ret) => ret.search('bin') !== -1)
  return shells
}

module.exports = {
  homedir: os.homedir(),
  platform: os.platform(),
  backup_dir: getBackupDir(),
  shells: getAvailableShells(),
  install_command: getOsInstallCommand()
}
