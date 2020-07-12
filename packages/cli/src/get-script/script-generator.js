// A; B    # Run A and then B, regardless of success of A
// A && B  # Run B if and only if A succeeded
// A || B  # Run B if and only if A failed
// A &     # Run A in background.

const path = require('path')
const { dotfiles_validation } = require('@os-bootstrap/config-validator')
const bash_writer = require('./bash-writer')
const { CONST } = require('../constants')
const {
    getDefaultDestinationFile,
    getFullSourceFile,
    isString,
    isConfigEntryEmpty,
    filter_output,
} = require('./helper')
const process_dotfiles = require('./dotfiles')
const process_before_scripts = require('./before-all')
const process_packages = require('./packages')

module.exports = function (data, dotfileLocation) {
    bash_writer.set(CONST.BASH_INTRO_STR)
    const before_script = process_before_scripts(data)
    bash_writer.set(before_script)
    const packages = process_packages(data)
    bash_writer.set(packages)
    const dotfiles = process_dotfiles(data)
    bash_writer.set(dotfiles)
    bash_writer.set(
        CONST.BASH_RUN_ALL_INSTALLATIONS(
            typeof before_script !== 'undefined',
            typeof packages !== 'undefined',
            typeof dotfiles !== 'undefined'
        )
    )

    bash_writer.set('EOF')
}
