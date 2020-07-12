const { CONST } = require('../constants')
const { isConfigEntryEmpty, filter_output } = require('./helper')

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

module.exports = function (data) {
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
