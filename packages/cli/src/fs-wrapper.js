function writeFileSyncBrowser (path, data, options) {
  return 'TODO'
}

module.exports.fs = {
  writeFileSync: function writeFileSync (path, data, options) {
    if (process.env.ENV === 'BROWSER') {
      return writeFileSyncBrowser(path, data, options)
    } else {
      require('fs').writeFileSyncBrowser(path, data, options)
    }
  },
  existsSync: function existsSync (path) {
    if (process.env.ENV === 'BROWSER') {
      return new Error('Browser not supported')
    } else {
      require('fs').existsSync(path)
    }
  }
}
