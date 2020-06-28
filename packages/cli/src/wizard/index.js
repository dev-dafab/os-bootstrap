const path = require('path'),
    fs = require('fs'),
    { URL } = require('url'),
    { validate } = require('@os-bootstrap/config-validator'),
    { write, read } = require('./config-file'),
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

function parseOptions(options) {
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

module.exports = function (options) {
    const opts = parseOptions(options)
    console.log(opts)
    require('./wizard')()
        .then((answers) => {
            validate(answers)
            return answers
        })
        .then((e) => {
            console.log('run hier already')
            return write(opts.configFile, e)
        })
}
