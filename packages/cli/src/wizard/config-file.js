;(Configstore = require('configstore')),
    (packageJson = require('../../package.json')),
    (fs = require('fs')),
    (os = require('os')),
    (path = require('path')),
    (yaml = require('js-yaml'))

function is_xdg_location(location) {
    return location.includes('.config')
}

module.exports.write = function write(location, data) {
    if (is_xdg_location(location)) {
        return new Configstore(packageJson.name, data)
    }
    const _data = yaml.safeDump(data, {
        indent: 2,
    })
    return fs.writeFileSync(
        path.resolve(os.homedir(), 'os-bootstrap.yaml'),
        _data,
        {
            encoding: 'utf8',
            flag: 'wx',
        }
    )
}

module.exports.read = function read(location) {
    if (is_xdg_location(location)) {
        return new Configstore(packageJson.name).all
    }
    try {
        return yaml.safeLoad(fs.readFileSync(location, 'utf8'))
    } catch (e) {
        console.log(e)
    }
}
