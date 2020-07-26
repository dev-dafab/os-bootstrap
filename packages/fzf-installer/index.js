const script_for_fzf_installation = `
FZF_DIR=~/.fzf
FZF_INSTALLER=~/.fzf/install

function setup() {
  if [[ ! -d "$FZF_DIR"  ]]; then
    git clone --depth 1 https://github.com/junegunn/fzf.git $FZF_DIR
    $FZF_INSTALLER option
  fi
}

setup
`

function parse (options) {
  return script_for_fzf_installation.replace('option', options.toString())
}

module.exports = function (answers) {
  return answers.WithFZF ? parse(answers.FZFInstallationOptions) : undefined
}
