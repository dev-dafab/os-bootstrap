[![Travis Build Status](https://travis-ci.org/fab-du/os-bootstrap.svg?branch=master)](https://travis-ci.org/fab-du/os-bootstrap.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/fab-du/os-bootstrap/badge.svg?branch=master)](https://coveralls.io/github/fab-du/os-bootstrap?branch=master)
# os-bootstrap
dependencies installer, dotfiles installer 

# Run the example (without installation)

Make sure you have Nodejs install

```
npm install && npm run dev
```

# Install the sample configuration in Docker __TODO__

You need to have Nodejs and docker install


# Config file format

```yml
dotfiles installation:
- vim:
    directory: vim 
    directories:
      - ~/.config/nvim
      - ~/.vim      
    file: vim/vimrc.vim
    files:
      - ~/.vimrc

- git gitconfig:
    file: git/gitconfig
    files:
      - ~/.gitconfig
      
- git gitignore:
    file: git/gitignore_global
    files:
      - ~/.gitignore_global
      
- zsh:
    directory: zsh 
    directories:
      - ~/.zsh
    file: zsh/zshenv
    files:
      - ~/.zshenv
      
- tmux:
    file: tmux/tmux.tmux
    files:
      - ~/.tmux.conf
      
- fzf:
    directory: fzf 
    directories:
      - ~/.fzf
```

# Consideration

* Take advantage of this tools by giving proper extension to your files.
    * Various Editor (IDE) will help you in your process of editing your dotfiles (color syntax, linting, compilation ....)