const { program } = require('commander')
const shelljs = require('shelljs')
const { getModules, resolvePackages } = require('./util')
const lintFixPackageJson = require('./lint-package-spec')
const { updateOrAddEntry } = require('./lint-package-spec')

const exec = (command) => shelljs.exec(command, { silent: false })

function main () {
  program.command('cp <files...>', '')
    .option('--ignore <ignoredFiles>', 'depedencies to ignores', [])
    .option('-o, --output <file>', 'output files', undefined)
    .action((files, { ignore, output }) => {
      const _output = files.length === 1 ? (output || '') : ''
      const _packages = getModules(ignore)
      files.forEach(file => runIn(_packages, (dir) => exec(`cp -f ${file} ${dir}/${_output}`)))
    })

  program.command('rm <files...>', '')
    .option('--ignore <ignoredFiles>', 'depedencies to ignores', [])
    .action((files, { ignore }) => {
      const _packages = getModules(ignore)
      files.forEach(file => runIn(_packages, (dir) => exec(`rm -f ${dir}/${file}`)))
    })

  program.command('install <packages...>')
    .option('--dev', 'dev dependency', false)
    .option('--ignore <files>', 'depedencies to ignores', [])
    .action((packages, { dev, ignore }) => {
      const installationCommand = `yarn add ${packages.join(' ')} ${dev ? '-D' : ''}`
      runIn(getModules(ignore), (dir) => exec(`cd ${dir} && ${installationCommand}`))
    })

  program.command('lintFixPackageJson [packages...]')
    .option('--ignore <files>', 'depedencies to ignores', [])
    .action((packages, { ignore }) => {
      const _packages = packages && packages.length > 0
        ? resolvePackages(packages, ignore)
        : getModules(ignore)
      lintFixPackageJson(_packages)
    })

  program.command('update-script [packages...]')
    .option('--ignore <files>', 'depedencies to ignores', [])
    .option('--entry <entrie>')
    .option('--value <value>')
    .action((packages, { ignore, entry, value }) => {
      const _packages = packages && packages.length > 0
        ? resolvePackages(packages, ignore)
        : getModules(ignore)
      updateOrAddEntry(_packages, entry, value)
    })

  program.command('run <cmd> [packages...]')
    .option('--ignore <files>', 'depedencies to ignores', [])
    .action((packages, { cmd, ignore }) => {
      const _packages = packages && packages.length > 0
        ? resolvePackages(packages, ignore)
        : getModules(ignore)
      runIn(_packages, (dir) => exec(`cd ${dir} && ${cmd}`))
    })

  program.parse(process.argv)
}

function runIn (packages, commandCb) {
  packages.filter(e => typeof e === 'string')
    .forEach(dir => commandCb(dir))
}

main()
