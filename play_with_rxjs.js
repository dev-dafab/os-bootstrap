const { Subject, ReplaySubject, of, concat } = require('rxjs')
const {
    map,
    filter,
    merge,
    mergeAll,
    delay,
    tap,
    takeUntil,
} = require('rxjs/operators')
const { prompt, ui } = require('inquirer')

const previousSelection$ = new ReplaySubject(null)
const parseSelection = (selection) => console.log(selection)

// TODO: find a better message for completion
const completionHandler = () => new ui.BottomBar({ bottomBar: 'Completed' })

// TODO: find a better default error Handler
const defaultErrorHandler = (error) => console.log(error)

// TODO: find a better default success Handler
const defaultSuccessHandler = (message) => console.log(message)

// think of concact as an ATM, the next transaction cannot be started
// until the previous one has completed
var prompts = new Subject()
prompt(prompts)

const question = [
    {
        type: 'list',
        name: 'q',
        message: 'Select Operating System',
        choices: [
            { name: 'OSX', value: 'OSX' },
            { name: 'Linux', value: 'Linux' },
        ],
    },
]

const questions = [
    {
        type: 'list',
        name: 'q',
        message: 'Select Operating System',
        choices: [
            { name: 'OSX', value: 'OSX' },
            { name: 'Linux', value: 'Linux' },
        ],
    },

    {
        type: 'list',
        name: 'q',
        message: 'Select preferred installation command',
        choices: [
            { name: 'brew', value: 'brew' },
            { name: 'apt-get', value: 'apt-get' },
        ],
    },

    {
        type: 'list',
        name: 'q',
        message: 'Select preferred shell environment',
        choices: [
            { name: 'zsh', value: 'zsh' },
            { name: 'bash', value: 'bash' },
            { name: 'fish', value: 'fish' },
        ],
    },

    {
        type: 'checkbox',
        name: 'q',
        message: 'Select preferred shell environment',
        choices: [
            { name: 'lightsql', value: 'lightsql' },
            { name: 'mysql', value: 'mysql' },
            { name: 'postgresql', value: 'postgresql' },
            { name: 'mongodb', value: 'mongodb' },
        ],
    },

    {
        type: 'checkbox',
        name: 'q',
        message: 'Select browsers',
        choices: [
            { name: 'chrome', value: 'chrome' },
            { name: 'chrome (Canary)', value: 'chrome (Canary)' },
            { name: 'firefox', value: 'firefox' },
        ],
    },

    {
        type: 'checkbox',
        name: 'q',
        message: 'Select IDE',
        choices: [
            { name: 'eclipse-ide', value: 'eclipse-ide' },
            { name: 'eclipse-java', value: 'eclipse-java' },
            { name: 'intellij-idea-ce', value: 'intellij-idea-ce' },
            { name: 'visual studio', value: 'visual studio' },
        ],
    },

    {
        type: 'checkbox',
        name: 'q',
        message: 'Select preferred shell environment',
        choices: [
            { name: 'java', value: 'java' },
            { name: 'nodejs', value: 'nodejs' },
            { name: 'go', value: 'go' },
            { name: 'python', value: 'python' },
        ],
    },
]

// store state of previous selected value
// parse selection
prompt(question)
    .ui.process.pipe(
        tap((value) => previousSelection$.next(value)),
        tap((value) => parseSelection(value))
    )
    .subscribe(defaultSuccessHandler, defaultErrorHandler, completionHandler)
