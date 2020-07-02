;(Configstore = require('configstore')),
    (osb_name = require('../../package.json').name),
    (fs = require('fs')),
    (yaml = require('js-yaml'))

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

module.exports.read = function read(location) {
    if (location === null) {
        return new Configstore(osb_name).all
    }
    try {
        return yaml.safeLoad(fs.readFileSync(location, 'utf8'))
    } catch (e) {
        console.log(e)
    }
}
