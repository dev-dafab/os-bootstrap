;(Configstore = require('configstore')),
    (osb_name = require('../../package.json').name),
    (fs = require('fs')),
    (os = require('os')),
    (path = require('path')),
    (yaml = require('js-yaml'))

function isEmptyConfig(content = {}) {
    try {
        return Object.keys(content).length === 0
    } catch (e) {
        return true
    }
}

function NoConfigurationFilePresents(message) {
    this.message = message
    this.name = 'NoConfigurationFilePresent'
}

function EmptyConfigurationFile(message) {
    this.message = message
    this.name = 'EmptyConfigurationFile'
}

module.exports.NoConfigurationFilePresent = NoConfigurationFilePresents
module.exports.EmptyConfigurationFile = EmptyConfigurationFile

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
    console.log(path.join(os.homedir(), 'osb.bash'))
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

    if (!fs.existsSync(_location)) {
        throw new NoConfigurationFilePresents(
            `config file ${_location} presents. please first run the wizard`
        )
    }

    const config_file_content = read_config(_location, config_store)
    if (isEmptyConfig(config_file_content)) {
        throw new EmptyConfigurationFile(
            `no ${config_store.path} empty. please first run the wizard`
        )
    }
    return config_file_content
}
