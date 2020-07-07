const parseOptions = require('../parse-options'),
    { validate } = require('@os-bootstrap/config-validator'),
    { read, write_bash } = require('../wizard/config-file'),
    generate_bash_script = require('./script-generator')

module.exports = async (options) => {
    const opts = parseOptions(options)
    try {
        const data = await validate(read(opts.configFile))
        const bash_script = await generate_bash_script(
            data,
            opts.dotfileLocation
        )
        write_bash(null, bash_script)
        const access = fs.createWriteStream(dir + '/osb.bash', { flags: 'a' })
        process.stdout.pipe(access)
    } catch (error) {
        process.exit(255)
        console.log('An error occur')
    }
}
