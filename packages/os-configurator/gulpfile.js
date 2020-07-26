const { src, dest, series } = require('gulp')
const concat = require('gulp-concat')
const gap = require('gulp-append-prepend')
const js_yaml = require('js-yaml')
const zip = require('gulp-zip')
const fs = require('fs')
const del = require('del')
const path = require('path')
const pack = require('./package.json')
const appname = pack.name
const appversion = pack.version
const specification_file = pack['os-bootstrap-specification-file']

const paths = {
  node_modules: './node_modules/',
  src: './src/',
  build: './build/',
  json: './json/'
}

function clean () {
  return del([paths.build])
}

function concatTask () {
  return src(['src/**/*.js', 'index.js'])
    .pipe(concat('index.js'))
    .pipe(dest('./build/'))
}

function yamlTask (cb) {
  const content = js_yaml.load(fs.readFileSync(specification_file))
  fs.writeFileSync(
        `./build/${path.parse(specification_file).name}.json`,
        JSON.stringify(content, null, ' ')
  )
  return cb()
}

function prependSpecTask () {
  return src('build/index.js')
    .pipe(
      gap.appendText(
                `module.exports.specification = require("./${
                    path.parse(specification_file).name
                }.json")`
      )
    )
    .pipe(dest(paths.build))
}

function copyTask () {
  return src(['./package.json']).pipe(dest(paths.build))
}

function prebublish () {
  return src('build/*')
    .pipe(zip(`${appname}-${appversion}.zip`))
    .pipe(dest(paths.build))
}

exports.build = series(
  clean,
  concatTask,
  yamlTask,
  prependSpecTask,
  copyTask,
  prebublish
)
