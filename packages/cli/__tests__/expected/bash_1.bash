#!/usr/bin/env bash
#
# Run the script with sh ~/osb.bash
# You can also pass some arguments to the install script to set some these options:
#   --skip-chsh: has the same behavior as setting CHSH to 'no'
# For example:
#   sh ~/osb.sh --unattended

set -e

function install_packages() {
    local packages=(
        "apt install git"
    )
    for (( i = 0; i < ${#packages[@]} ; i++ )); do
        printf "**** Running: %s  *****\n" "${packages[$i]}"
        eval "${packages[$i]}" &
    done
}

function install_dotfiles() {
    local dotfiles=(
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/osx/osx ~/.osx"
    )
    for (( i = 0; i < ${#dotfiles[@]} ; i++ )); do
        printf "**** Running: %s  *****\n" "${dotfiles[$i]}"
        eval "${dotfiles[$i]}" &
    done
}


install_packages;
install_dotfiles
