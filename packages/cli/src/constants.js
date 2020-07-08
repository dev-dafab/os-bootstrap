const { EOL } = require('os')
const indentString = require('indent-string')

const indent = (str, length = 4) => indentString(str, length)

module.exports.CONST = {
    DEFAULT_DOTFILES_DIR: `${os.homedir()}/.dotfiles`,
    DEFAULT_OSB_CONFIG_DIR: `${os.homedir()}/.config/osb`,
    BASH_INTRO_STR: `#!/usr/bin/env bash
#
# Run the script with sh ~/osb.bash
# You can also pass some arguments to the install script to set some these options:
#   --skip-chsh: has the same behavior as setting CHSH to 'no'
# For example:
#   sh ~/osb.sh --unattended

set -e
`,
    BASH_PACKAGES_FOR_LOOP: (arr) => `
function install_packages() {
    local packages=(
${arr.map((e) => indent(`\"${e}\"`, 8)).join(EOL)}
    )
    for (( i = 0; i < \${#packages[@]} ; i++ )); do
    ${indent('printf "**** Running: %s  *****\\n" "${packages[$i]}"')}
    ${indent('eval "${packages[$i]}" &')}
    done
}
`,
    BASH_BEFORE_ALL: (arr) => `
function before_all() {
${indent(arr.join(` && ${EOL}`))}
}
`,
    BASH_DOTFILES_INSTALL: (arr) => `
function install_dotfiles() {
    local dotfiles=(
${arr.map((e) => indent(`\"${e}\"`, 8)).join(EOL)}
    )
    for (( i = 0; i < \${#dotfiles[@]} ; i++ )); do
    ${indent('printf "**** Running: %s  *****\\n" "${dotfiles[$i]}"')}
    ${indent('eval "${dotfiles[$i]}" &')}
    done
}
`,
    BASH_RUN_ALL_INSTALLATIONS: `
before_all &&
install_packages;
install_dotfiles
`,
}
