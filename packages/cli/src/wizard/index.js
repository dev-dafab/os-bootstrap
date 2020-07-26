const path = require('path')
const parseOptions = require('../parse-options')
const { URL } = require('url')
const { validate } = require('@os-bootstrap/config-validator')
const { write, read } = require('./config-file')

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
