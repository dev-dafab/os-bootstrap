const path = require('path'),
    parseOptions = require('../parse-options'),
    { URL } = require('url'),
    { validate } = require('@os-bootstrap/config-validator'),
    { write, read } = require('./config-file')

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
