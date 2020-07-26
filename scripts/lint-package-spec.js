const path = require('path')
const shelljs = require('shelljs')
const { writeFile, rootDir } = require('./util')

const _keyOrder = [
  'name',
  'version',
  'description',
  /* main if present */
  /* directories if present */
  /* files if present */
  'private',
  /* workspace if present */
  'scripts',
  /* dependencies if present */
  /* devDependencies if present */
  'author',
  'license',
  'bugs',
  'homepage',
  'repository'
  /* publishConfig if presents */
  /* all the rest in alphabetical order */
]

let keyOrder = [..._keyOrder]

function formatPackageJson (packageJson) {
  keyOrder = [..._keyOrder]
  const jsonObject = require(packageJson)
  hasRequiredKeys(jsonObject, key => {
    console.error(`missing required key: ${key}`)
    process.exit(-1)
  })
  addOrder(jsonObject)
  writeFile(packageJson, JSON.stringify(putInOrder(jsonObject)))
  const lintProgram = path.resolve(rootDir(), 'node_modules/jsonlint/lib/cli.js')
  shelljs.exec(`${lintProgram} ${packageJson} --in-place`, { silent: true })
}

function addOrder (jsonObject) {
  const mainInJson = 'main' in jsonObject
  if (mainInJson) {
    keyOrder.splice(keyOrder.findIndex(e => e === 'private'), 0, 'main')
  }

  if ('directories' in jsonObject) {
    let idx = keyOrder.findIndex(e => e === 'description') + 1
    if (mainInJson) {
      idx = idx + 1
    }
    keyOrder.splice(idx, 0, 'directories')
  }

  if ('files' in jsonObject) {
    const idx = keyOrder.findIndex(e => e === 'private')
    keyOrder.splice(idx, 0, 'files')
  }

  if ('dependencies' in jsonObject) {
    keyOrder.splice(keyOrder.findIndex(e => e === 'author'), 0, 'dependencies')
  }
  if ('devDependencies' in jsonObject) {
    let idx = keyOrder.findIndex(e => e === 'author')
    if ('dependencies' in jsonObject) {
      idx = keyOrder.findIndex(e => e === 'dependencies') + 1
    }
    keyOrder.splice(idx, 0, 'devDependencies')
  }

  if ('workspaces' in jsonObject) {
    keyOrder.splice(keyOrder.findIndex(e => e === 'scripts'), 0, 'workspaces')
  }

  if ('publishConfig' in jsonObject) {
    keyOrder.splice(keyOrder.findIndex(e => e === 'repository') + 1, 0, 'publishConfig')
  }
}

function hasRequiredKeys (obj, errorCb) {
  const setOfObjectKey = new Set(Object.keys(obj))
  return keyOrder.every(key => {
    const ret = setOfObjectKey.has(key)
    if (ret === false) {
      errorCb(key)
      return ret
    }
    return ret
  })
}

function putInOrder (jsonObject) {
  let ret = keyOrder.reduce((acc, key) => {
    return key in jsonObject
      ? { ...acc, [key]: jsonObject[key] }
      : acc
  }, {})

  const set = new Set(Object.keys(jsonObject))
  keyOrder.forEach(e => set.delete(e))
  set.forEach(key => (ret = { ...ret, [key]: jsonObject[key] }))
  return ret
}

function main (_packageJsons) {
  let packageJsons = []
  try {
    packageJsons = _packageJsons.map(e => path.resolve(e, 'package.json'))
  } catch (e) {
    console.error('cannot resolve package.json')
    process.exit(-1)
  }
  packageJsons.forEach(formatPackageJson)
}
function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

function mergeDeep (target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

function updateOrAddEntry (_packageJsons, entries) {
  let packageJsons = []
  try {
    packageJsons = _packageJsons.map(e => path.resolve(e, 'package.json'));
  } catch (e) {
    console.error('cannot resolve package.json')
    process.exit(-1)
  }
  packageJsons.forEach(path => {
    const jsonObject = mergeDeep(require(path), JSON.parse(entries))
    writeFile(path, JSON.stringify(jsonObject));
    main(_packageJsons);
  })
}

module.exports = main
module.exports.updateOrAddEntry = updateOrAddEntry
