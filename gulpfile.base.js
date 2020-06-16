const { src, dest, series } = require('gulp'),
    concat = require('gulp-concat'),
    gap = require('gulp-append-prepend'),
    yaml = require('gulp-yaml'),
    zip = require('gulp-zip'),
    del = require('del'),
    path = require('path'),
    pack = require('./package.json'),
    appname = pack.name,
    appversion = pack.version,
    specification_file = pack['os-bootstrap-specification-file']

const paths = {
    node_modules: './node_modules/',
    src: './src/',
    build: './build/',
    json: './json/',
}

function clean() {
    return del([paths.build])
}

function concatTask() {
    return src(['src/**/*.js', 'index.js'])
        .pipe(concat('index.js'))
        .pipe(dest('./build/'))
}

function yamlTask() {
    return src(specification_file)
        .pipe(yaml({ schema: 'DEFAULT_FULL_SCHEMA' }))
        .pipe(dest(paths.build))
}

function prependSpecTask() {
    return src('build/index.js')
        .pipe(
            gap.appendText(`module.exports.specification = require("./${path.parse(specification_file).name}.json")`)
        )
        .pipe(dest(paths.build))
}

function copyTask() {
    return src(['./package.json']).pipe(
        dest(paths.build)
    )
}

function prebublish() {
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
