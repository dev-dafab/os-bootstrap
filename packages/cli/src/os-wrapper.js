module.exports.os = {
  homedir: function () {
    if (process.env.ENV === 'BROWSER') {
      return ''
    } else {
      require('os').homedir()
    }
  }
}
