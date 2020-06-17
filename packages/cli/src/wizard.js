const inquirer = require('inquirer')
const clear = require('clear')

function start_wizard() {
    let wizard_items = [
        require('@os-bootstrap/os-configurator'),
        require('@os-bootstrap/dotfiles-configurator/build'),
        require('@os-bootstrap/installation_command-configurator/build'),
    ]

    let whens = wizard_items.reduce((acc, item) => {
        if ('when' in item) {
            Object.keys(item.when).forEach((key) => {
                acc[key] = item.when[key]
            })
        }
        return acc
    }, {})

    const questions = wizard_items
        .reduce((acc, item) => {
            const objects = item.specification.objects
            acc.push(...objects)
            return acc
        }, [])
        .map((item) => {
            // append when function to questions
            if (item.name in whens) {
                item['when'] = whens[item.name]
            }
            return item
        })

    clear()
    inquirer.prompt(questions).then((answers) => {
        clear({ fullClear: false })
        console.log()
        console.log()
        console.log()
        console.log()
        console.log(answers)
    })
}

start_wizard()

module.exports = function (options) {
    start_wizard()
}
