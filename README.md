[![Travis Build Status](https://travis-ci.org/fab-du/os-bootstrap.svg?branch=master)](https://travis-ci.org/fab-du/os-bootstrap.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/fab-du/os-bootstrap/badge.svg?branch=master)](https://coveralls.io/github/fab-du/os-bootstrap?branch=master)
# os-bootstrap
dependencies installer, dotfiles installer


# Run the example (without installation)

Make sure you have Nodejs install

```
npm install && npm run dev
```

# Limitations

* This software only support  __linux__ alike OS and Mac OS.
* the software only work with Posix compliant filesystem.

# dependencies installation command

For linux like OS if no installation command ist provided, the software will assume the following installation
commands ( in order ) until it find the first command that is runnable:

- `apt-get`
- `yum` (Red Hat)
- `urpmi` (Mandriva)
- `yast` (Open Suse)


# files installation

`ln -s` is use for configuration files installation.
It s possible to provided your own installation command.


# Integration testing with docker
__TODO__


# Config file format

```yml
core:
os: OSX
dotfiles_location: ~/.dotfiles

dotfiles:
- vim:
  - src: vim
    destination:
      - ~/.config/nvim
      - ~/.vim
  - src: vim/vimrc.vim
    destination:
      - ~/.vimrc

- git gitconfig:
  - src: git/gitconfig
    destination:
      - ~/.gitconfig

- git gitignore:
  - src: git/gitignore_global
    destination:
      - ~/.gitignore_global

- zsh:
  - src: zsh
    destination:
      - ~/.zsh

- fileWithoutSource:
  - src: fileWithoutSource

- wrongConfiguration:

- tmux:
  - src: tmux/tmux.tmux
    destination:
      - ~/.tmux.conf

- fzf:
  - src: fzf
    destination:
    - ~/.fzf

dependencies:
- git-core
- git
- curl
- wget
- ssh
- sshfs
- httpie
- tree
- stow
- shellcheck
- xclip:
    os:
      name: linux
- pbcopy:
    os:
    - name: darwin
      command: custom_install_command install pbcopy
- tmux
- tmuxinator
- pure-prompt:
    os:
    - name: linux
      command: npm install -g pure-prompt
- java:
    os:
    - name: linux
      command: apt-get install java
    - name: darwin
      command: brew install java
- oracle:
    os:
    - name: linux
      command: apt-get install oracle
    - name: darwin
      command: brew install oracle
- postgresql
- [mysql-client, mysql-server, mysql-common]
- mongodb
```

# Web Interface
the Provision specification file can be generate than a web interface.
The User who does not want to write the specification file can use the web interface
to his advantage.

# Consideration

* Take advantage of this tools by giving proper extension to your files.
    * Various Editor (IDE) will help you in your process of editing your dotfiles (color syntax, linting, compilation ....)
