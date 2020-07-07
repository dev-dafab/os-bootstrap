const path = require('path')
const cmd = require('./cmd')
const { dotfiles_validation } = require('@os-bootstrap/config-validator')

const isString = (obj) => typeof obj === 'string'

const getFullSourceFile = (source, dotfile_location) => {
    return path.isAbsolute(source)
        ? source
        : path.join(process.env.PWD, dotfile_location, source)
}

const getDefaultDestinationFile = (source) => {
    const ret = source.split('/').pop()
    return ret.includes('.') ? `~/${ret}` : `~/.${ret}`
}

// - sudo $installation_command install zsh; chsh -s $(which zsh)
// - $if_os_eq_darwin ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
const osb_eval = (str, data) => {
    if (!str.includes('$')) {
        return str
    }

    if (str.includes('$installation_command')) {
        return str.replace(
            '$installation_command',
            data['core']['installation_command']
        )
    }

    if (str.includes('eq') && str.includes('$if')) {
        const str_parts = str.split(' ').shift().split('_')
        return data['core'][str_parts[1]] === str_parts.pop()
            ? `${str.split(str.split(' ').shift()).pop()}`.trim()
            : ''
    }

    return str
}

// A; B    # Run A and then B, regardless of success of A
// A && B  # Run B if and only if A succeeded
// A || B  # Run B if and only if A failed
// A &     # Run A in background.
//
// Command for running scripts in paralell
// - parallel       -- GNU based

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
            return `sudo ${installation_command} install ${pack}`
        })
    },
    customs: function (dependencies, installation_command, os) {
        return dependencies.map((pack) => {
            const type_of_pack = typeof pack
            if (type_of_pack === 'string') {
                return `sudo ${installation_command} install ${pack}`
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
    const dependencies = data.dependencies[type]
    const installation_command = data.core.installation_command
    const os = data.core.os
    return processors[type](dependencies, installation_command, os)
}

function generate_ln_command(dotfile_spec, dotfiles_location) {
    return dotfile_spec.files.map((file) => {
        return (isString(file.destinations)
            ? [file.destinations]
            : file.destinations
        ).map((destination) => {
            return `ln -s ${getFullSourceFile(
                file.source,
                dotfiles_location
            )} ${destination}`
        })
    })
}

function process_dotfiles(dotfiles, os, dotfiles_location) {
    return dotfiles
        .map((dotfile) => {
            const key_name = Object.keys(dotfile).pop()
            const dotfile_spec = dotfile[key_name]
            if (dotfiles_validation.isOnlySourcesSpec(dotfile)) {
                return (isString(dotfile_spec['source'])
                    ? [dotfile_spec['source']]
                    : dotfile_spec['source']
                ).reduce(
                    (acc, source) => {
                        acc[key_name].files.push({
                            source,
                            destinations: [getDefaultDestinationFile(source)],
                        })
                        return acc
                    },
                    { [key_name]: { files: [] } }
                )
            }
            return dotfile
        })
        .map((dotfile) => {
            const dotfile_name = Object.keys(dotfile).pop()
            const dotfile_spec = dotfile[dotfile_name]
            if ('os' in dotfile_spec) {
                const oses =
                    typeof dotfile_spec['os'] === 'string'
                        ? [dotfile_spec['os']]
                        : dotfile_spec['os']
                if (oses.includes(os)) {
                    return generate_ln_command(dotfile_spec, dotfiles_location)
                }
                return ''
            }
            return generate_ln_command(dotfile_spec, dotfiles_location)
        })
}

function addParallel(value) {
    const delimiter = cmd.is_parallel_installed() ? 'parallel ' : ''
    if (value.startsWith('***')) {
        return value
    }
    return `${delimiter}${value}`
}

function process_before_scripts(data) {
    return ('before_all' in data ? data['before_all'] : []).map((e) => {
        return osb_eval(e, data)
    })
}

module.exports = function (data) {
    return [
        '************** Before Script **************',
        ...process_before_scripts(data),
        '************** PACKAGES INSTALLATION **************',
        ...process_pack_installation(data, 'simples'),
        ...process_pack_installation(data, 'customs'),
        '************** DOTFILES INSTALLATION **************',
        ...process_dotfiles(
            data.dotfiles,
            data.core.os,
            data.core.dotfiles_location
        ),
        '************** END OF INSTALLATION **************',
        '**************       HAVE FUN      **************',
    ]
        .flat(10)
        .filter((el) => typeof el !== 'undefined' && el.length > 0)
        .map(addParallel)
}
