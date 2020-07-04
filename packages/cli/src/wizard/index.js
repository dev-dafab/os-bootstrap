const path = require('path'),
    parseOptions = require('../parse-options'),
    { URL } = require('url'),
    { validate } = require('@os-bootstrap/config-validator'),
    { write, read } = require('./config-file')

module.exports = async (options) => {
    const opts = parseOptions(options)

    try {
        const answers = await require('./wizard')()
        const validatedAnswers = await validate(answers)
        return write(opts.configFile, validatedAnswers)
    } catch (error) {
        console.log(error)
    }
}
