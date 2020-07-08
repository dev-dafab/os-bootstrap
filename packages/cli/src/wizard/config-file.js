;(Configstore = require('configstore')),
    (osb_name = require('../../package.json').name),
    (fs = require('fs')),
    (os = require('os')),
    ({
        EmptyConfigurationFile,
        NoConfigurationFilePresents,
    } = require('../error')),
    (path = require('path')),
    (yaml = require('js-yaml'))

function isEmptyConfig(content = {}) {
    try {
        return Object.keys(content).length === 0
    } catch (e) {
        return true
    }
}

module.exports.write = function write(location, data) {
    if (location === null) {
        return new Configstore(osb_name, data)
    }
    const _data = yaml.safeDump(data, {
        indent: 2,
    })
    return fs.writeFileSync(location, _data, {
        encoding: 'utf8',
        flag: 'wx',
    })
}

module.exports.write_bash = function write(location = null, data) {
    const file =
        location === null ? path.join(os.homedir(), 'osb.bash') : location
    return fs.writeFileSync(file, data, {
        encoding: 'utf8',
        flag: 'wx',
    })
}

function read_config(location, configstore) {
    if (configstore !== null) {
        configstore.all
    }

    return yaml.safeLoad(fs.readFileSync(location, 'utf8'))
}

module.exports.read = function read(location) {
    let _location = location
    let config_store = null

    if (location === null) {
        config_store = new Configstore(osb_name)
        _location = config_store.path
    }

    _location = path.isAbsolute(_location)
        ? _location
        : path.join(process.env.PWD, _location)

    if (!fs.existsSync(_location)) {
        throw new NoConfigurationFilePresents(_location)
    }

    const config_file_content = read_config(_location, config_store)
    if (isEmptyConfig(config_file_content)) {
        throw new EmptyConfigurationFile(_location)
    }
    return config_file_content
}
