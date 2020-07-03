const eol = require('eol').auto
const cmd = require('./cmd')

const simple_packages = ['xclip', 'tree', 'ssh', 'git', 'curl'].reduce(
    (acc, curr, idx) => {
        if (idx === 0) {
            return `  ${acc}${curr}`
        }
        return `${acc}
  ${eol(curr)}`
    },
    ''
)

function start() {
    return `${eol('#!/usr/bin/env bash')}
${eol('')}
${eol('')}
${eol('SIMPLE_PACKAGES=(')}
${simple_packages}
${eol(')')}
${eol('')}
`
}

function parse_installation_cmd(acc, curr) {
    const start_delimiter = cmd.is_parallel_installed() ? 'parallel' : ''
    acc = `${acc}; ${eol(`${delimiter} ${curr}`)}`
}

const ret = start()
console.log(ret)
