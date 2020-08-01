const { exec, exitError, jsonAddOrUpdateEntry } = require('./util')
const { resolve } = require('path')

function getInitCommand (moduleName) {
  try {
    const lerna = resolve(__dirname, '..', 'node_modules/lerna/cli.js')
    return `${lerna} create ${moduleName} --yes`
  } catch (e) {
    exitError('please install lerna in your root module')
  }
}

function changeValue (moduleName) {
  const rootPackageValue = require(resolve(process.env.PWD, 'package.json'))
  const modulePackagePath = resolve(
    process.env.PWD,
    `packages/${moduleName}/package.json`
  )
  const modulePackageValue = require(modulePackagePath)
  const newPackageName = `@${rootPackageValue.name}/${modulePackageValue.name}`
  jsonAddOrUpdateEntry(modulePackagePath, `this.name = "${newPackageName}"`)
  jsonAddOrUpdateEntry(
    modulePackagePath,
    `this.description = "${newPackageName}"`
  )
}

function main (newModuleName) {
  exec(getInitCommand(newModuleName))
  changeValue(newModuleName)
}

module.exports = main
