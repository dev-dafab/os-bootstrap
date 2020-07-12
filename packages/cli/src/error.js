const { Subject } = require('rxjs')

const NoConfigurationFilePresentsCode = 4
const EmptyConfigurationFileCode = 5
const DotfileNotPresentsCode = 6

const subject = Object.freeze(new Subject())
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
class OsbWarning extends Error {}

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

class DotfileNotPresents extends OsbWarning {
    constructor(file) {
        super(
            `\n Dotfiles ${file} directory . not presents on the system \n
 Please provide an existing dotfiles locations.
 Defaults:
    - dotfiles contains osb.yaml / os-bootstrap.yaml
    - $XDG-CONFIG/osb/dotfiles
    - $HOME/.dotfiles
`
        )
        this.code = DotfileNotPresentsCode
    }
}

module.exports = {
    error_service,
    OsbError,
    OsbWarning,
    EmptyConfigurationFile,
    NoConfigurationFilePresents,
    DotfileNotPresents,
    error_code: {
        NoConfigurationFilePresentsCode,
        EmptyConfigurationFileCode,
        DotfileNotPresentsCode,
    },
}
