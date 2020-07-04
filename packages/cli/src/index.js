#!/usr/bin/env node

const { program } = require('commander'),
    help_message = require('./help.message'),
    { version } = require('../package'),
    wizard = require('./wizard'),
    get_script = require('./get-script'),
    figlet = require('figlet'),
    chalk = require('chalk')

program.version(version)

const title = (cb) => {
    console.log(
        chalk.yellow(
            figlet.textSync('OSB: OS Bootstrap', {
                horizontalLayout: 'default',
                verticalLayout: 'default',
            })
        )
    )
    cb()
}

program
    .command('wizard')
    .option('-c, --config-file [configfile]', 'yaml specification file', null)
    .option('-d, --dotfile-location <dotfile_location>', 'dotfile location')
    .option('-xdg, --xdg', 'use XDG config', false)
    .action(async (options) => {
        title(async () => {
            const config_file = await wizard(options)
            console.log(config_file)
        })
    })

program
    .command('get-script')
    .option('-c, --config-file <config_file>', 'yaml specification file', null)
    .option('-xdg, --xdg', 'use XDG config', true)
    .action(async (options) => {
        title(async () => {
            const script = await get_script(options)
            console.log(script)
        })
    })

program.on('--help', () => {
    console.log(help_message)
})

program.parse(process.argv)
