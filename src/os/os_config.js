const os = require('os');
const fs = require('fs');

let shells = null;

function getOsInstallCommand() {
    if (os.platform() === 'darwin') {
        return 'brew install '
    } else if (os.platform() === 'linux') {
        return 'sudo apt-get install -y '
    } else {
        throw new Error('Your system is not yet supported');
    }
}

function getBackupDir() {
    const dateNow = new Date(Date.now());
    return os.homedir()
            + '/dotfiles_backup_'
            + dateNow.toLocaleDateString() + '_'
            + dateNow.toLocaleTimeString();
}

function getAvailableShells() {
    const shells =
    fs.readFileSync('/etc/shells', {encoding: 'utf8'})
        .split('\n')
        .filter(ret => ret.search('bin') !== -1);
        return shells;
}

function has_shell(arg) {
    if (!shells) {
        throw new Error('No Shells');
    }

    return shells.indexOf(args) !== -1;
}

module.exports = {
    homedir: os.homedir(),
    platform: os.platform(),
    backup_dir: getBackupDir(),
    shells: getAvailableShells(),
    has_shell: has_shell,
    install_command : getOsInstallCommand()
};
