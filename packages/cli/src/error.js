const { Subject } = require('rxjs')

const NoConfigurationFilePresentsCode = 4
const EmptyConfigurationFileCode = 5

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

const error_service = Object.freeze(singleton)

class OsbError extends Error {}

class NoConfigurationFilePresents extends OsbError {
    constructor(file) {
        super(
            `\n no config file ${file} presents on the filesystem. \n please first run the wizard`
        )
        this.code = NoConfigurationFilePresentsCode
    }
}

class EmptyConfigurationFile extends OsbError {
    constructor(file) {
        super(
            `\n ${file} empty. \n please first run the wizard command: \n osb wizard`
        )
        this.code = EmptyConfigurationFileCode
    }
}

module.exports = {
    error_service,
    OsbError,
    EmptyConfigurationFile,
    NoConfigurationFilePresents,
    error_code: {
        NoConfigurationFilePresentsCode,
        EmptyConfigurationFileCode,
    },
}
