const shelljs = require('shelljs')
const help_message = require('../src/help.message')

describe('CLI Options test', function () {
    test('wrong option or command provided', async () => {
        const { stderr, code } = shelljs.exec(
            'node src/index.js --wrong-option',
            {
                silent: true,
            }
        )
        expect(stderr).toContain('error: unknown option')
        expect(code).not.toBe(0)
    })

    test('no argument provided', async () => {
        const { stdout, code } = shelljs.exec('node src/index.js --help', {
            silent: true,
        })
        expect(stdout).toContain(help_message)
        expect(code).toBe(0)
    })
})
