const URL = require('url')

const shell_setup = `
  chsh -s $(which shell)
`

const oh_my_setup = `
  command -c "$(curl -fsSL script_url)"
`

const url = {
    'oh-my-fish': 'https://get.oh-my.fish',
    'oh-my-bash':
        'https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh',
    'oh-my-zsh':
        'https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh',
}

function parse(shell = 'zsh', installation = 'oh-my-zsh') {
    const command = shell === 'fish' ? 'fish' : 'sh'
    if (installation.search('oh') !== -1) {
        return shell_setup
            .replace('shell', shell)
            .concat(
                oh_my_setup
                    .replace('command', command)
                    .replace('script_url', url[installation])
            )
    } else if (installation === 'custom') {
    } else {
    }
}

module.exports = function (answers) {
    return parse(answers.Shell, answers.SHELLInstallation)
}
