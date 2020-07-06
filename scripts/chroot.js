#!/usr/bin/env node

const { exec } = require('shelljs')
const fs = require('fs')

const chroot_dir = '~/osb'

const packages = ['node']

const chroot_dirs = {
    bin: ['bash', 'touch', 'ls', 'rm', 'dirname', 'head', 'cat', 'command'],
    'usr/bin': ['readlink'],
    lib: [],
    tmp: [],
    lib64: [],
}

const _exec = (cmd, options = {}) => exec(cmd, { ...options, silent: true })
const mkdir = (dir) => _exec(`mkdir -p ${dir}`)

const cp_bin_dependencies = (bin) => {
    _exec(`ldd ${bin} | egrep -o "/lib.*.[0-9]"`)
        .stdout.split(/\r*\n/)
        .map((e) => e.split('(').shift().trim())
        .filter((e) => e.length > 0)
        .map((e) => `cp -v --parents ${e} ${chroot_dir}`)
        .forEach(_exec)
}

_exec(`rm -rf ${chroot_dir}`)


// mkdir
Object.keys(chroot_dirs)
    .map((key) => `${chroot_dir}/${key}`)
    .forEach(mkdir)

// cp dependencies
Object.keys(chroot_dirs).forEach((key) => {
    chroot_dirs[key]
        .map((value) => {
            const bin = `/${key}/${value}`
            _exec(`cp -v ${bin} ${chroot_dir}/bin`)
            return bin
        })
        .forEach(cp_bin_dependencies)
})

// cp bats
_exec(`cp /usr/libexec/bats-core/bats /usr/libexec/bats-core/bats-* ${chroot_dir}/bin`)
_exec(`cp /usr/bin/env  ${chroot_dir}/usr/bin/`)

packages
    .map((value) => {
        const executable_path = _exec(`which ${value}`)
            .stdout.split(/\r*\n/)
            .shift()
        _exec(`cp -v ${executable_path} ${chroot_dir}/bin`)
        return executable_path
    })
    .forEach(cp_bin_dependencies)

_exec(`cp -v -rf ./packages/cli ${chroot_dir}`)
