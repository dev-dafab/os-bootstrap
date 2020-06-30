#!/usr/bin/env node

const { program } = require('commander'),
    help_message = require('./help.message'),
    { version } = require('../package'),
    wizard = require('./wizard'),
    get_script = require('./get-script')

program.version(version)

program
    .command('wizard')
    .option('-c, --config-file [configfile]', 'yaml specification file')
    .option('-l, --dotfile-location <dotfile_location>', 'dotfile location')
    .option('-xdg, --xdg', 'use XDG config')
    .action((options) => {
        wizard(options)
    })

program
    .command('get-script')
    .option('-c, --config-file <config_file>', 'yaml specification file')
    .option('-xdg, --xdg', 'use XDG config')
    .action(async (options) => {
        const script = await get_script(options)
        console.log(script)
    })

program.on('--help', () => {
    console.log(help_message)
})

try {
    program.parse(process.argv)
} catch (err) {
    console.log(err)
    console.log('An error occur')
}
