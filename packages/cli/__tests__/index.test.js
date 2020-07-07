const shelljs = require('shelljs')
const help_message = require('../src/help.message')

const exec = (options) =>
    shelljs.exec(`node src/index.js ${options}`, { silent: true })

describe('CLI Options test', function () {
    test('wrong option or command provided', async () => {
        const { stderr, code } = exec('--wrong-option')
        expect(stderr).toContain('error: unknown option')
        expect(code).not.toBe(0)
    })

    test('no argument provided', async () => {
        const { stdout, code } = exec('--help')
        expect(stdout).toContain(help_message)
        expect(code).toBe(0)
    })

    test('command:get-script required config file not provided', async () => {
        const { stderr, code } = exec('get-script')
        expect(stderr).toContain('required option')
        expect(stderr).toContain('-c, --config-file')
        expect(stderr).toContain('not specified')
        expect(code).not.toBe(0)
    })
})

describe('command:get-script', function () {
    test('wrong option or command provided', async () => {
        const { stderr, code } = exec('get-script --config-file')
        expect(stderr).toContain('error: unknown option')
        expect(code).not.toBe(0)
    })
})
