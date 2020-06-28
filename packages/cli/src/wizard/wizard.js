const inquirer = require('inquirer')
inquirer.registerPrompt('recursive', require('inquirer-recursive'))
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))
const clear = require('clear')

function get_wizard_function(function_name, wizard_items) {
    return wizard_items.reduce((acc, item) => {
        if (function_name in item) {
            Object.keys(item[function_name]).forEach((key) => {
                acc[key] = item[function_name][key]
            })
        }
        return acc
    }, {})
}

// TODO: Inquirer.js may support mutate answers
// later: https://github.com/SBoudrias/Inquirer.js/issues/935
function removeIntermediateResponse(answers) {
    let result = answers
    Object.keys(result).forEach((key) => {
        if (
            key.toLowerCase().includes('is') ||
            key.toLowerCase().includes('with') ||
            key.toLowerCase().includes('has')
        ) {
            delete result[key]
        }
    })
    return result
}

function start_wizard(options) {
    let wizard_items = [
        require('@os-bootstrap/os-configurator'),
        require('@os-bootstrap/dotfiles-configurator'),
        require('@os-bootstrap/installation_command-configurator'),
        require('@os-bootstrap/simple-dependency-installer'),
    ]

    const whens = get_wizard_function('when', wizard_items)
    const filters = get_wizard_function('filter', wizard_items)
    const validators = get_wizard_function('validate', wizard_items)
    const transformers = get_wizard_function('transformer', wizard_items)
    const prompts = get_wizard_function('prompts', wizard_items)

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
        .map((item) => {
            // append filter function to questions
            if (item.name in filters) {
                item['filter'] = filters[item.name]
            }
            return item
        })
        .map((item) => {
            // append validate function to questions
            if (item.name in validators) {
                item['validate'] = validators[item.name]
            }
            return item
        })
        .map((item) => {
            // append transformer function to questions
            if (item.name in transformers) {
                item['transformer'] = transformers[item.name]
            }
            return item
        })
        .map((item) => {
            // append transformer function to questions
            if (item.name in prompts) {
                item['prompts'] = prompts[item.name]()
            }
            return item
        })

    clear()
    inquirer.prompt(questions).then((answers) => {
        clear({ fullClear: false })
        console.log()
        console.log(JSON.stringify(removeIntermediateResponse(answers)))
    })
}

module.exports = function wizard(options) {
    start_wizard(options)
}
