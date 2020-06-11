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
