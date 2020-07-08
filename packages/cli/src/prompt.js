const inquirer = require('inquirer')
const clear = require('clear')
const { Subject, iif } = require('rxjs')
const { tap, map, mergeMap } = require('rxjs/operators')

const errorCallback = (
    errorCb = (err) => {
        throw err
    }
) => (error) => {
    errorCb(error)
}

const completedCallback = (prompt) => {
    prompt.ui.process.complete()
    console.log('completed')
}

module.exports = function (questions, successCallback) {
    const prompts = new Subject()
    const prompt = inquirer.prompt(prompts)

    questions.forEach((question) => {
        prompts.next(question)
    })

    prompt.ui.process
        .asObservable()
        .pipe(tap(console.log))
        .subscribe(successCallback, errorCallback, completedCallback(prompt))
}
