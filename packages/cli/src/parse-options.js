const path = require('path')
const fs = require('fs')
const { URL } = require('url')

function path_exists (path) {
  return fs.existsSync(path)
}

function is_url (url) {
  try {
    new URL(url)
  } catch (e) {
    return false
  }
}

module.exports = function (options) {
  let configFile = null
  if (options.configFile !== null) {
    configFile = options.configFile
  }

  const dotfileLocation =
        options.dotfileLocation &&
        path_exists(options.dotfileLocation) &&
        is_url(options.dotfileLocation)
          ? options.dotfileLocation
          : null

  return {
    configFile,
    dotfileLocation
  }
}
