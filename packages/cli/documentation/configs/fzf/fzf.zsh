# Setup fzf
# ---------
if [[ ! "$PATH" == *${HOME}/.fzf/bin* ]]; then
  export PATH="${PATH:+${PATH}:}${HOME}/.fzf/bin"
fi

# Auto-completion
# ---------------
[[ -f ${HOME}/.fzf/shell/completion.zsh ]] &&
  source "${HOME}/.fzf/shell/completion.zsh" 2> /dev/null

# Key bindings
# ------------
[[ -f ${HOME}/.fzf/shell/key-bindings.zsh ]] &&
  source "${HOME}/.fzf/shell/key-bindings.zsh" 2> /dev/null

# Custom config
[[ -f ${HOME}/.fzf.config.zsh ]] &&
  source "${HOME}/.fzf.config.zsh" 2> /dev/null
