const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const util = require('util')
const { Subject } = require('rxjs')
const inquirer = require('inquirer')
const clear = require('clear')

const parseSelection = (selection) => console.error(selection)

// TODO: find a better message for completion
const completionHandler = () => new ui.BottomBar({ bottomBar: 'Completed' })

// TODO: find a better default error Handler
const defaultErrorHandler = (error) => console.log(error)

// TODO: find a better default success Handler
const defaultSuccessHandler = (val) =>
    console.log(`SUCCESS HAND ${val.toString()}`)

const pathConfigurators = [
    path.resolve(__dirname, 'packages/configurators/os/os.configurator.yaml'),
    path.resolve(
        __dirname,
        'packages/configurators/shell/shell.configurator.yaml'
    ),
    // path.resolve(__dirname, "packages/configurators/installation_command/installation_command.configurator.yaml"),
    // path.resolve(__dirname, "packages/configurators/dotfiles/dotfiles.configurator.yaml")
]

const pathInstallers = [
    path.resolve(
        __dirname,
        'packages/installers/fzf-installer/fzf.installer.yaml'
    ),
]

const contents = []

try {
    for (const _path of pathConfigurators) {
        contents.push(yaml.load(fs.readFileSync(_path)))
    }
} catch (e) {
    console.log(e)
}

var prompts = new Subject()
const prompt = inquirer.prompt(prompts)

clear()
for (const content of contents) {
    content.Objects.forEach((config) => {
        prompts.next(config)
    })
}

prompt.ui.process.subscribe((val) => {
    console.log(val)
    prompts.complete()
    clear({ fullClear: false })
})
