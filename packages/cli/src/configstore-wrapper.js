module.exports.Configstore = function () {
    if (process.env.ENV === 'BROWSER') {
        return class {
            constructor(name, data) {}
        }
    } else {
        return require('configstore')
    }
}
