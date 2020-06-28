const URL = require('url')

function parse(pathOrUrl) {
    new URL(pathOrUrl)
    return `core.dotfiles_location: ${pathOrUrl}`
}

module.exports = function (answers) {
    return answers.withDotfiles && String(answers.dotfilesLocation).length > 0
        ? parse(answers.dotfilesLocation)
        : undefined
}

module.exports.when = {
    'core.dotfiles_location': function (answer) {
        return answer.withDotfiles === true
    },
}

module.exports.filter = {
    'core.dotfiles_location': function (answer) {
        delete answer.withDotfiles;
        return answer;
    },
}

