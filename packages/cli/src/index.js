const path = require('path')
const fs = require('fs')
const { URL } = require('url')

const xdg_config_path = '~/.config/configstore/os-bootstrap.json'

function path_exists(path) {
    return fs.existsSync(path)
}

function is_url(url) {
    try {
        new URL(url)
    } catch (e) {
        return false
    }
}

module.exports = function (options) {
    const configFile = xdg_config_path
    if (!option.xdg) {
        configFile =
            options.configFile && path_exists(options.configFile)
                ? options.configFile
                : xdg_config_path
    }
    const dotfileLocation =
        options.dotfileLocation &&
        path_exists(options.dotfileLocation) &&
        is_url(options.dotfileLocation)
            ? options.dotfileLocation
            : null

    return {
        configFile,
        dotfileLocation,
    }
}
