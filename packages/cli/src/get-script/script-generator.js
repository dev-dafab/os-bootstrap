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
const osb_eval = require('./osb-eval')
const process_dotfiles = require('./dotfiles')

function custom_dependency_parser(
    pack,
    installation_command,
    os,
    cb_for_simple_pack_array
) {
    if (Array.isArray(pack)) {
        return cb_for_simple_pack_array(pack, installation_command)
    } else {
        const el = pack[Object.keys(pack).pop()].os
            .filter((_pack) => _pack.name === os)
            .pop()
        if (typeof el !== 'undefined' && 'command' in el) {
            return el.command
        }
        return undefined
    }
}

const processors = {
    simples: function (dependencies, installation_command, os) {
        return dependencies.flat(10).map((pack) => {
            return `${installation_command} install ${pack}`
        })
    },
    customs: function (dependencies, installation_command, os) {
        return dependencies.map((pack) => {
            const type_of_pack = typeof pack
            if (type_of_pack === 'string') {
                return `${installation_command} install ${pack}`
            } else if (type_of_pack === 'object') {
                return custom_dependency_parser(
                    pack,
                    installation_command,
                    os,
                    processors.simples
                )
            } else {
                return ''
            }
        })
    },
}

function process_pack_installation(data, type) {
    if (typeof data.dependencies[type] === 'undefined') {
        return []
    }

    const dependencies = data.dependencies[type]
    const installation_command = data.core.installation_command
    const os = data.core.os
    return processors[type](dependencies, installation_command, os)
}

function process_before_scripts(data) {
    if (isConfigEntryEmpty(data, 'before_all')) {
        return undefined
    }
    const before_all_scripts = data['before_all']
        .map((e) => {
            return osb_eval(e, data)
        })
        .filter(filter_output)
    return CONST.BASH_BEFORE_ALL(before_all_scripts)
}

function process_packages(data) {
    if (isConfigEntryEmpty(data, 'dependencies')) {
        return undefined
    }
    const arr = [
        process_pack_installation(data, 'simples'),
        process_pack_installation(data, 'customs'),
    ]
        .flat(10)
        .filter(filter_output)
    return CONST.BASH_PACKAGES_FOR_LOOP(arr)
}

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
