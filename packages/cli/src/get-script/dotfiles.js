const { CONST } = require('../constants')
const {
    getFullSourceFile,
    isConfigEntryEmpty,
    filter_output,
} = require('./helper')

const { dotfiles_validation } = require('@os-bootstrap/config-validator')

const generate_ln_command = (dotfiles_location) => (dotfile) => {
    const dotfile_spec = Object.entries(dotfile).pop().pop()
    return dotfile_spec.files.map((file) => {
        return file.destinations.map((destination) => {
            return `ln -s ${getFullSourceFile(
                file.source,
                dotfiles_location
            )} ${destination}`
        })
    })
}

const filterByOs = (currentOs) => (dotfile) => {
    const dotfile_spec = Object.entries(dotfile).pop().pop()
    return (
        ('os' in dotfile_spec && dotfile_spec['os'].includes(currentOs)) ||
        dotfile_spec['os'].pop().includes('*')
    )
}

module.exports = function process_dotfiles(data) {
    if (isConfigEntryEmpty(data, 'dotfiles')) {
        return undefined
    }

    const dotfiles_location = data['core']['dotfiles_location']
    const _dotfiles = data['dotfiles']
        .filter(filter_output)
        .filter(filterByOs(data['core']['os']))
        .map(generate_ln_command(dotfiles_location))
        .flat(10)
    return _dotfiles.length > 0
        ? CONST.BASH_DOTFILES_INSTALL(_dotfiles)
        : undefined
}
