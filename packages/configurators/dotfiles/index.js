const URL = require('url')

function parse(pathOrUrl) {
    try {
        new URL(pathOrUrl)
        return `git clone ${pathOrUrl} ~/.dotfiles`
    } catch (e) {
        return pathOrUrl
    }
}

module.exports = function (answers) {
    return answers.WithDotfiles && String(answers.DotfilesLocation).length > 0
        ? parse(answers.DotfilesLocation)
        : undefined
}
