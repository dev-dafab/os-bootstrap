#!/usr/bin/env node

const shelljs = require('shelljs')
const platform = process.platform

const osb_cmd_name = platform === 'win32' ? 'osb.exe' : 'osb'
const osb_cmd = `./build/${platform}/${osb_cmd_name}`

shelljs.exec(osb_cmd)
