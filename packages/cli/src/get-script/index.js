const parseOptions = require('../parse-options'),
    { validate } = require('@os-bootstrap/config-validator'),
    { read, write } = require('../wizard/config-file'),
    generate_bash_script = require('./script-generator')

module.exports = function (options) {
    const opts = parseOptions(options)
    return validate(read(opts.configFile))
        .then((_data) => generate_bash_script(_data))
        .catch((err) => console.log(err))
}
