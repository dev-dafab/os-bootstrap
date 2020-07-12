const { Subject } = require('rxjs')
const { takeWhile } = require('rxjs/operators')

const subject = Object.freeze(new Subject())

function write_to_stdout(value) {}

var singleton = {
    get: function () {
        return subject.asObservable()
    },
    set: function (value) {
        if (typeof value !== 'undefined') {
            subject.next(value)
        }
    },
}

module.exports = Object.freeze(singleton)
