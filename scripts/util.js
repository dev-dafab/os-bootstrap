const shelljs = require('shelljs')
const path = require('path')
const fs = require('fs')

function filterWithIgnore (arr, ignoredModules) {
  return arr.filter(e => typeof e === 'string')
    .filter(e => !ignoredModules.includes(e.split('/').pop()))
}

function rootDir () {
  return require('app-root-dir').get()
}

function resolvePackage (packName) {
  return path.resolve(rootDir(), 'packages/'.concat(packName))
}

module.exports.getModules = function getModules (ignoredModules = []) {
  const _ignoredModules = Array.isArray(ignoredModules)
    ? ignoredModules
    : ignoredModules.split(',').map(e => e.trim())
  return filterWithIgnore(shelljs.ls('-d', path.resolve(rootDir(), 'packages/*')), _ignoredModules)
}

module.exports.resolvePackages = function resolvePackages (packNames, ignoredPackages = []) {
  return filterWithIgnore(packNames.map(resolvePackage), ignoredPackages)
}

module.exports.writeFile = function writeFile (path, data) {
  return fs.writeFileSync(path, data)
}

module.exports.rootDir = rootDir
