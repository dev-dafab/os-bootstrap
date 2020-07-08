const { Subject } = require('rxjs')

function initSubject() {
    return new Subject()
}

const subject = Object.freeze(initSubject())
var singleton = {
    get: function () {
        return subject.asObservable()
    },
    set: function (value) {
        subject.next(value)
    },
}

module.exports = Object.freeze(singleton)
