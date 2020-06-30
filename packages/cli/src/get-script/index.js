const parseOptions = require('../parse-options'),
    { validate } = require('@os-bootstrap/config-validator'),
    { read, write } = require('../wizard/config-file'),
    generate_bash_script = require('./script-generator')

module.exports = function (options) {
    const opts = parseOptions(options)
    const data = read(opts.configFile)
    return validate(data)
        .then((_data) => {
            return generate_bash_script(data)
        })
        .catch((err) => console.log(err))
}
