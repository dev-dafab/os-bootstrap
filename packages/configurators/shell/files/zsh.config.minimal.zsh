##############
# Completion
##############
setopt AUTO_CD
setopt auto_menu
setopt magic_equal_subst
zmodload -i zsh/complist

zstyle ':completion:*:*:*:*:*' menu select
zstyle ':completion:*:default' menu select=2
zstyle ':completion:*' list-colors ''

autoload -U colors && colors

# Use caching to make completion for commands such as dpkg and apt usable.
zstyle ':completion::complete:*' use-cache on
zstyle ':completion::complete:*' cache-path "${ZDOTDIR:-$HOME}/.zcompcache"

###############
# cd and pushd
###############
setopt AUTO_CD
setopt AUTO_PUSHD

###########
# History
###########
export HISTFILE=${HOME}/.zsh_history
export HISTSIZE=10000
export SAVEHIST=10000

setopt append_history
setopt extended_history
setopt share_history
setopt hist_ignore_space
setopt hist_ignore_all_dups

#############
# Misc
#############
bindkey -e
