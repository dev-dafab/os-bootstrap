const shelljs = require('shelljs')
const help_message = require('../help.message')

describe('CLI Options test', function () {
    beforeAll(() => {
        shelljs.exec('npm link')
    })

    test('wrong option or command provided', async () => {
        const { stderr, code } = shelljs.exec('os-bootstrap --wrong-option', {
            silent: true,
        })
        expect(stderr).toContain('error: unknown option')
        expect(code).not.toBe(0)
    })

    test('no argument provided', async () => {
        const { stdout, code } = shelljs.exec('os-bootstrap --help', {
            silent: true,
        })
        expect(stdout).toContain(help_message)
        expect(code).toBe(0)
    })

    afterAll(() => {
        shelljs.exec('npm unlink')
    })
})
