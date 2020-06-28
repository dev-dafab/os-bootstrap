#!/usr/bin/env node

const { program } = require('commander'),
    help_message = require('./help.message'),
    { version } = require('../package'),
    wizard = require('./wizard')

program.version(version)

program
    .command('wizard')
    .option('-c, --config-file [configfile]', 'yaml specification file')
    .option('-l, --dotfile-location <dotfile_location>', 'dotfile location')
    .option('-xdg, --xdg', 'use XDG config')
    .action((options) => {
        console.log(options.configFile)
        console.log(options.dotfileLocation)
        console.log(options.xdg)
        console.log(wizard)
        wizard(options)
    })

program
    .command('get-script')
    .option('-c, --config-file <config_file>', 'yaml specification file')
    .option('-xdg, --xdg', 'use XDG config')
    .action((options) => {
        console.log(options.configFile)
        console.log(options.xdg)
    })

program.on('--help', () => {
    console.log(help_message)
})

try {
    program.parse(process.argv)
} catch (err) {
    console.err(err)
    console.log('An error occur')
}
