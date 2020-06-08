import { IsValidCommand } from "../validation.decorator";
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { parseConfig } from "..";
import { isInstance } from "class-validator";
import { Config } from "../config.model";

const best_case_scenario_example= `
---
core:
  os: OSX
  dotfiles_location: ~/.dotfiles
  installation_command: brew

dotfiles:
  - vim:
      os: ["osx", "linux"]
      files:
        - source: vim
          destination:
            - ~/.config/nvim
            - ~/.vim
        - source: vim/vimrc.vim
          destination:
          - ~/.vimrc

  - git gitconfig:
      files:
        - source: git/gitconfig
          destination:
          - ~/.gitconfig

  - git gitignore:
      files:
        - source: git/gitignore_global
          destination:
            - ~/.gitignore_global

  - zsh:
      files:
        - source: zsh
          destination:
            - ~/.zsh

  - tmux:
      files:
        - source: tmux/tmux.tmux
          destination:
            - ~/.tmux.conf

  - fzf:
      files:
        - sources: fzf
          destination:
          - ~/.fzf

dependencies:
  simples:
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
    - postgresql
    - [mysql-client, mysql-server, mysql-common]
    - mongodb
    - tmux
    - tmuxinator

  customs:
    - xclip:
    - pbcopy:
        os:
        - name: darwin
          command: custom_install_command install pbcopy
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

`;
test('Best case scenario', async () => {
  const ret = await parseConfig(best_case_scenario_example);
  expect(ret).toBeDefined();
  expect(ret instanceof Config).toBeTruthy();
});


const test_data_core_not_undefined= `
---
dotfiles:
  - vim:
      os: ["osx", "linux"]
      files:
        - source: vim
          destination:
            - ~/.config/nvim
            - ~/.vim
        - source: vim/vimrc.vim
          destination:
          - ~/.vimrc

dependencies:
  simples:
    - git-core
    - git

  customs:
    - java:
        os:
        - name: linux
          command: apt-get install java
        - name: darwin
          command: brew install java

`;
test('core cannot be empty', async () => {
  const ret = await parseConfig(test_data_core_not_undefined);
  expect(ret).toBeDefined();
  expect( (ret as string[]).length > 0  ).toBeTruthy( );
});

