const parseOptions = require('../parse-options'),
    { validate } = require('@os-bootstrap/config-validator'),
    { read, write_bash } = require('../wizard/config-file'),
    os = require('os')
generate_bash_script = require('./script-generator')
const bash_writer = require('./bash-writer')
const { error_service, OsbError } = require('../error')

bash_writer.get().subscribe((value) => {
    console.log(value)
})

module.exports = async (options) => {
    const opts = parseOptions(options)
    try {
        const data = read(opts.configFile)
        const validatedData = await validate(data)
        await generate_bash_script(validatedData, opts)
    } catch (error) {
        if (error instanceof OsbError) {
            error_service.set(error)
        }
        throw error
    }
}
