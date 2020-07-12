const parseOptions = require('../parse-options'),
    { validate } = require('@os-bootstrap/config-validator'),
    { read, write_bash } = require('../wizard/config-file'),
    os = require('os')
generate_bash_script = require('./script-generator')
const bash_writer = require('./bash-writer')
const { error_service, OsbError } = require('../error')
const { Readable } = require('stream')
const fs = require('fs')

function writer(output) {
    const inStream = new Readable({
        read() {},
    })
    bash_writer.get().subscribe((value) => {
        if (value === 'EOF') {
            inStream.push(null)
            const _output =
                typeof output === 'undefined'
                    ? process.stdout
                    : fs.createWriteStream(output)
            inStream.pipe(_output)
            return
        }
        inStream.push(value)
        return
    })
}

module.exports = async (options) => {
    const opts = parseOptions(options)
    try {
        writer(options['output'])
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
