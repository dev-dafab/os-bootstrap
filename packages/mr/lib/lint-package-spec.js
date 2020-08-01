const path = require('path')
const {
  writeFile,
  exitError,
  lintFixJson,
  jsonAddOrUpdateEntry
} = require('./util')

const requiredKeys = [
  'name',
  'version',
  'description',
  'private',
  'scripts',
  'author',
  'license',
  'bugs',
  'homepage',
  'repository'
]

const _keyOrder = [
  'name',
  'version',
  'description',
  'main',
  'directories',
  'files',
  'private',
  'workspace',
  'scripts',
  'dependencies',
  'devDependencies',
  'author',
  'license',
  'bugs',
  'homepage',
  'repository',
  'publishConfig'
  /* all the rest in alphabetical order */
]

function formatPackageJson (packageJson) {
  const jsonObject = require(packageJson)
  hasRequiredKeys(jsonObject, (key) =>
    exitError(`missing required key: ${key}`)
  )
  writeFile(packageJson, JSON.stringify(putInOrder(jsonObject)))
  lintFixJson(packageJson)
}

function hasRequiredKeys (obj, errorCb) {
  const setOfObjectKey = new Set(Object.keys(obj))
  return requiredKeys.every((key) =>
    setOfObjectKey.has(key) === false ? errorCb(key) : true
  )
}

function putInOrder (jsonObject) {
  const ret = _keyOrder.reduce((acc, key) => {
    if (key in jsonObject) {
      acc = { ...acc, [key]: jsonObject[key] }
      delete jsonObject[key]
    }
    return acc
  }, {})

  return { ...ret, ...jsonObject }
}

function main (_packageJsons) {
  let packageJsons = []
  try {
    packageJsons = _packageJsons.map((e) => path.resolve(e, 'package.json'))
    console.log(packageJsons)
  } catch (e) {
    exitError(`cannot resolve ${e}`)
  }
  packageJsons.forEach(formatPackageJson)
}

function updateOrAddEntry (packageJsons, value) {
  try {
    packageJsons
      .map((e) => path.resolve(e, 'package.json'))
      .forEach((packageJsonPath) =>
        jsonAddOrUpdateEntry(packageJsonPath, value)
      )
    main(packageJsons)
  } catch (error) {
    exitError('cannot resolve package.json')
  }
}

module.exports = main
module.exports.updateOrAddEntry = updateOrAddEntry
