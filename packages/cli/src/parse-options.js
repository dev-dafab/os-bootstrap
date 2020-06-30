const path = require('path'),
    fs = require('fs'),
    { URL } = require('url'),
    xdg_config_path = '~/.config/configstore/os-bootstrap.json'

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
    let configFile = xdg_config_path
    if (!options.xdg) {
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
