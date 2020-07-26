const MAX_DEPTH = 2

const isArray = (obj) => Array.isArray(obj)

const hasInstallationCmd = (obj) => obj.hasOwnProperty('command')
const isOsSpecify = (obj) => obj.hasOwnProperty('name')
const isStandAloneDependency = (obj) => typeof obj === 'string'
const isObject = (obj) => typeof obj === 'object'
const installCmdHadSpace = (cmd) => cmd.trim().length < cmd.length
const maxDepthReached = (value) => value === MAX_DEPTH

// TODO fds: remove this when nodejs will support flat
const flat = (accumulator, currentValue) => {
  if (Array.isArray(currentValue)) {
    return [...accumulator, ...currentValue]
  }
  return accumulator.concat(currentValue)
}

const hasValidOsSpecificInstallation = (obj) => {
  if (!Object.hasOwnProperty('os')) {
    return false
  }
  if (isArray(obj)) {
    return obj.every((config) => isOsSpecify(config))
  }
  isOsSpecify(obj)
}

let depth = 0

const parse_depencencies = (
  obj,
  _installation_cmd = 'apt-get install ',
  os_name = 'linux'
) => {
  const installation_cmd = installCmdHadSpace(_installation_cmd)
    ? _installation_cmd
    : _installation_cmd.concat(' ')

  let ret = obj
    .map((entry) => {
      if (isStandAloneDependency(entry)) {
        return installation_cmd.concat(entry)
      }

      if (isArray(entry)) {
        if (maxDepthReached(depth)) {
          throw new Error(
            'MAX_DEPTH: please flaten your configuration file'
          )
        }
        depth++
        return parse_depencencies(entry, _installation_cmd, os_name)
      }

      if (isObject(entry)) {
        const depencyName = Object.keys(entry)[0]
        const depency = entry[depencyName]
        if (hasValidOsSpecificInstallation(depencyName)) {
          return ''
        }

        const os_dependencies = depency.os
        if (!isArray(os_dependencies) && isObject(os_dependencies)) {
          const ret =
                        os_dependencies.name === os_name
                          ? hasInstallationCmd(os_dependencies)
                            ? os_dependencies.command
                            : installation_cmd.concat(depencyName)
                          : ''
          return ret
        }

        // find os matching detected os
        const cmd = os_dependencies.find((el) => el.name === os_name)
        if (!cmd) return ''
        const ret =
                    cmd.name === os_name
                      ? hasInstallationCmd(cmd)
                        ? cmd.command
                        : cmd.concat(depencyName)
                      : ''
        return ret
      }
    })
    .filter((entry) => entry)
    // .flat(depth) -> Waiting for you

  // TODO Remove this when nodejs will support flat()
  for (let i = 0; i < depth + 1; i++) {
    ret = ret.reduce(flat, [])
  }
  return ret
}

module.exports = parse_depencencies
