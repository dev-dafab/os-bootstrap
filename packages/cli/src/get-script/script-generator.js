function custom_dependency_parser(
    package,
    installation_command,
    os,
    cb_for_simple_package_array
) {
    if (Array.isArray(package)) {
        return cb_for_simple_package_array(package, installation_command)
    } else {
        const el = package[Object.keys(package).pop()].os
            .filter((_package) => _package.name === os)
            .pop()
        if (typeof el !== 'undefined' && 'command' in el) {
            return el.command
        }
        return undefined
    }
}

const processors = {
    simples: function (dependencies, installation_command, os) {
        return dependencies.flat(10).map((package) => {
            return `sudo ${installation_command} install ${package}`
        })
    },
    customs: function (dependencies, installation_command, os) {
        return dependencies.map((package) => {
            const type_of_package = typeof package
            if (type_of_package === 'string') {
                return `sudo ${installation_command} install ${package}`
            } else if (type_of_package === 'object') {
                return custom_dependency_parser(
                    package,
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

function process_package_installation(data, type) {
    const dependencies = data.dependencies[type]
    const installation_command = data.core.installation_command
    const os = data.core.os
    return processors[type](dependencies, installation_command, os)
}

function generate_ln_command(dotfile_spec) {
    return dotfile_spec.files.map((file) => {
        return (typeof file.destination === 'string'
            ? [file.destination]
            : file.destination
        ).map((destination) => {
            return `ln -s ${file.source} ${destination}`
        })
    })
}

function process_dotfiles(dotfiles, os) {
    return dotfiles.map((dotfile) => {
        const dotfile_name = Object.keys(dotfile).pop()
        const dotfile_spec = dotfile[dotfile_name]
debugger
        if ('os' in dotfile_spec) {
            const oses =
                typeof dotfile_spec['os'] === 'string' ? [dotfile_spec['os']] : dotfile_spec['os']
            if (oses.includes(os)) {
                return generate_ln_command(dotfile_spec)
            }
            return ''
        }
        return generate_ln_command(dotfile_spec)
    })
}

module.exports = function (data) {
    const script = [
        ...process_package_installation(data, 'simples'),
        ...process_package_installation(data, 'customs'),
        ...process_dotfiles(data.dotfiles, data.core.os),
    ]
        .flat(10)
        .filter((el) => typeof el !== 'undefined' && el.length > 0)

    console.log(script)
    return script
}
