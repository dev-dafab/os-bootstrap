const shelljs = require('shelljs')
const help_message = require('../src/help.message')

const exec = (options) =>
    shelljs.exec(`node src/index.js ${options}`, { silent: true })

const getConfigFile = (file) => `__tests__/fixtures/${file}.yaml`
const readBashFile = (file) =>
    shelljs.exec(`cat __tests__/expected/${file}.bash`, { silent: true }).stdout

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

// [expected_bash_output, configFile, description, statuscode ]
const best_cases = [['bash_1', 'osb_1', 'some description', 0]]

describe('command:get-script best-cases', function () {
    test.each(best_cases)(
        'should return bash %s when config file %s: %s',
        async (bash_output, configFile, description, statuscode) => {
            const { stderr, stdout, code } = exec(
                `get-script --config-file ${getConfigFile(configFile)}`
            )
            expect(code).toBe(statuscode)
            expect(stdout).toContain(readBashFile(bash_output))
        }
    )
})
