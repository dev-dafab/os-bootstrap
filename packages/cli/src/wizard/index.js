const path = require('path'),
    parseOptions = require('../parse-options'),
    { URL } = require('url'),
    { validate } = require('@os-bootstrap/config-validator'),
    { write, read } = require('./config-file')

module.exports = function (options) {
    const opts = parseOptions(options)
    require('./wizard')()
        .then((answers) => {
            validate(answers)
            return answers
        })
        .then((e) => {
            console.log('run hier already')
            console.log(opts.configFile, e)
            return write(opts.configFile, e)
        })
}
