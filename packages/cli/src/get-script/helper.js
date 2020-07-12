const isConfigEntryEmpty = (data, entry) =>
    typeof data[entry] === 'undefined' || data[entry].length === 0

const isString = (obj) => typeof obj === 'string'

const filter_output = (el) => typeof el !== 'undefined' || el?.length > 0

const getFullSourceFile = (source, dotfile_location) => {
    return path.isAbsolute(source)
        ? source
        : path.join(process.env.PWD, dotfile_location, source)
}

const getDefaultDestinationFile = (source) => {
    const ret = source.split('/').pop()
    return ret.includes('.') ? `~/${ret}` : `~/.${ret}`
}

module.exports = {
    isString,
    isConfigEntryEmpty,
    filter_output,
    getFullSourceFile,
    getDefaultDestinationFile,
}
