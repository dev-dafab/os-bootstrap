const fs = require('fs')
const util = require('util')

const MAX_DEPTH = 2

const isValidConfiguration = (obj) =>
    Array.isArray(obj) && obj.every((el) => el.hasOwnProperty('src'))
const hasDestination = (obj) => obj.hasOwnProperty('destination')
const getFullInstallationCmdWithDestinationProvided = (cmd, src, dest) =>
    cmd.concat(src).concat(` ${dest}`)

// will assume home and src filename unchanged
const getFullInstallationCmdWithoutDestination = (cmd, src) =>
    getFullInstallationCmdWithDestinationProvided(cmd, src, `~/${src}`)

const getFullInstallationCmd = (cmd, entry) =>
    hasDestination(entry)
        ? getFullInstallationCmdWithDestinationProvided(
              cmd,
              entry.src,
              entry.destination
          )
        : getFullInstallationCmdWithoutDestination(cmd, entry.src)

const parseDotfilesLink = (configs, installation_cmd = 'ln -s ') => {
    const keys = []
    const ret = configs.map((entry) => {
        const key = Object.keys(entry)[0]
        keys.push(key)
        return isValidConfiguration(entry[key])
            ? entry[key].map((el) =>
                  getFullInstallationCmd(installation_cmd, el)
              )
            : []
    })

    return ret
}

module.exports = parseDotfilesLink
