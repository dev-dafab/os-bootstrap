#!/usr/bin/env node

const { program } = require('commander'),
    help_message = require('./help.message'),
    { version } = require('../package'),
    wizard = require('./wizard'),
    get_script = require('./get-script')

program.version(version)

program
    .command('wizard')
    .option('-c, --config-file [configfile]', 'yaml specification file', null)
    .option('-d, --dotfile-location <dotfile_location>', 'dotfile location')
    .option('-xdg, --xdg', 'use XDG config', false)
    .action(async (options) => {
        await wizard(options)
    })

program
    .command('get-script')
    .requiredOption(
        '-c, --config-file <config_file>',
        'yaml specification file'
    )
    .option('-xdg, --xdg', 'use XDG config', true)
    .action(async (options) => {
        await get_script(options)
    })

program.on('--help', () => {
    console.log(help_message)
})

program.parse(process.argv)
