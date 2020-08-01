const shelljs = require('shelljs')
const path = require('path')
const fs = require('fs')

function filterWithIgnore (arr, ignoredModules) {
  return arr
    .filter((e) => typeof e === 'string')
    .filter((e) => !ignoredModules.includes(e.split('/').pop()))
}

function rootDir () {
  return require('app-root-dir').get()
}

function resolvePackage (packName) {
  console.log(__dirname)
  return path.resolve(rootDir(), 'packages/'.concat(packName))
}

module.exports.getModules = function getModules (ignoredModules = []) {
  const _ignoredModules = Array.isArray(ignoredModules)
    ? ignoredModules
    : ignoredModules.split(',').map((e) => e.trim())
  return filterWithIgnore(
    shelljs.ls('-d', path.resolve(rootDir(), 'packages/*')),
    _ignoredModules
  )
}

module.exports.resolvePackages = function resolvePackages (
  packNames,
  ignoredPackages = []
) {
  return filterWithIgnore(packNames.map(resolvePackage), ignoredPackages)
}

module.exports.writeFile = function writeFile (path, data) {
  return fs.writeFileSync(path, data)
}

module.exports.lintFixJson = function lintLjson (jsonFile) {
  const lintProgram = path.resolve(
    rootDir(),
    'node_modules/jsonlint/lib/cli.js'
  )
  shelljs.exec(`${lintProgram} ${jsonFile} --in-place`, { silent: true })
}

module.exports.jsonAddOrUpdateEntry = function jsonAddOrUpdateEntry (
  jsonFile,
  value
) {
  const jsonProgram = path.resolve(rootDir(), 'node_modules/json/lib/json.js')
  console.log(JSON.stringify(value))
  console.log(jsonFile)
  shelljs.exec(
    `${jsonProgram} -I -f  ${jsonFile} -e ${JSON.stringify(value)}`,
    { silent: true }
  )
}

function exec (command, opts) {
  return shelljs.exec(command, opts || { silent: true })
}

module.exports.exitError = function exitError (errorMessage, exitCode) {
  console.error(errorMessage)
  process.exit(exitCode || -1)
}

module.exports.rootDir = rootDir
module.exports.exec = exec
module.exports.hasCommand = exec
