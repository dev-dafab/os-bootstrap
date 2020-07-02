const path = require('path')

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
        return (typeof file.destination === 'string'
            ? [file.destination]
            : file.destination
        ).map((destination) => {
            const source = path.join(dotfiles_location, file.source)
            return `ln -s ${source} ${destination}`
        })
    })
}

function process_dotfiles(dotfiles, os, dotfiles_location) {
    return dotfiles.map((dotfile) => {
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

module.exports = function (data) {
    return [
        ...process_pack_installation(data, 'simples'),
        ...process_pack_installation(data, 'customs'),
        ...process_dotfiles(
            data.dotfiles,
            data.core.os,
            data.core.dotfiles_location
        ),
    ]
        .flat(10)
        .filter((el) => typeof el !== 'undefined' && el.length > 0)
}
