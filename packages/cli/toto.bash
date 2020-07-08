/home/dev/Projekts/os-bootstrap/packages/cli/documentation/osb.yaml

#!/usr/bin/env bash
#
# Run the script with sh ~/osb.bash
# You can also pass some arguments to the install script to set some these options:
#   --skip-chsh: has the same behavior as setting CHSH to 'no'
# For example:
#   sh ~/osb.sh --unattended

set -e


function before_all() {
    sudo brew install zsh; chsh -s $(which zsh) && 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
}


function install_packages() {
    local packages=(
        "brew install git-core"
        "brew install git"
        "brew install git-extras"
        "brew install git-flow"
        "brew install git-lfs"
        "brew install hub"
        "brew install docker"
        "brew install docker-compose"
        "brew install ssh"
        "brew install sshfs"
        "brew install ssh-import-id"
        "brew install ssh-tools"
        "brew install shellcheck"
        "brew install bats"
        "brew install mysql-client"
        "brew install mysql-server"
        "brew install mysql-common"
        "brew install curl"
        "brew install wget"
        "brew install httpie"
        "brew install tree"
        "brew install stow"
        "brew install postgresql"
        "brew install tmux"
        "brew install tmuxinator"
        "custom_install_command install pbcopy"
        "brew cask install --appdir='/Applications' virtualbox"
        "brew cask install --appdir='/Applications' slack"
        "brew install java"
    )
    for (( i = 0; i < ${#packages[@]} ; i++ )); do
        printf "**** Running: %s  *****\n" "${packages[$i]}"
        eval "${packages[$i]}" &
    done
}


function install_dotfiles() {
    local dotfiles=(
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/osx/osx ~/.osx"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/vim ~/.config/nvim"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/vim ~/.vim"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/vim/init.vim ~/.vimrc"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/vifm ~/.config/vifm"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/git/gitconfig ~/.gitconfig"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/git/gitignore_global ~/.gitignore_global"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/zsh/zshrc.zsh ~/.zshrc"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/zsh/zsh-custom-plugins ~/.zsh-custom-plugins"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/tmux/tmux.conf ~/.tmux.conf"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/tmux/tmux-config ~/.tmux/plugins/tmux-config"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/fzf/fzf.zsh ~/fzf.zsh"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/fzf/fzf.config.zsh ~/fzf.config.zsh"
        "ln -s /home/dev/Projekts/os-bootstrap/packages/cli/configs/curl/curlrc ~/.curlrc"
    )
    for (( i = 0; i < ${#dotfiles[@]} ; i++ )); do
        printf "**** Running: %s  *****\n" "${dotfiles[$i]}"
        eval "${dotfiles[$i]}" &
    done
}


before_all &&
install_packages;
install_dotfiles

