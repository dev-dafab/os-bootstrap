const inquirer = require('inquirer')
const clear = require('clear')
const { Subject, iif } = require('rxjs')
const { tap, map, mergeMap } = require('rxjs/operators')

const errorCallback = console.log
const completedCallback = console.log

module.exports = function (questions, successCallback) {
    const prompts = new Subject()
    const prompt = inquirer.prompt(prompts)

    questions.forEach((question) => {
        prompts.next(question)
    })

    const observe = prompt.ui.process.asObservable()
    observe
        .pipe(tap(console.log))
        .subscribe(successCallback, errorCallback, () => {
            console.log('terminate')
            prompt.ui.process.complete()
        })
}
