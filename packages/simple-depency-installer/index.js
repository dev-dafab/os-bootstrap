const data = [
    'tree',
    'openssh',
    'sshfs',
    'sshfs',
    'ssh-tools',
    'ssh-import-id',
    'tmux',
    'tmuxinator',
    'tmate',
    'nginx',
    'sqlite3',
    'nmap',
    'cargo',
    'assume-yes',
    'rofi',
    'ripgrep',
    'urlview',
]

function searchDependency(oldAnswers, input) {
    input = input || ''
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data);
            resolve(data)
        }, 500)
    })
}

const promptType = {
    type: 'autocomplete',
    pageSize: 5,
    suggestOnly: true,
    source: searchDependency,
}

module.exports.prompts = {
    'dependency.simple': function () {
        const _data = data.map((e) => {
            return { ...promptType, name: e, message: e }
        })
        return _data
    },
}
