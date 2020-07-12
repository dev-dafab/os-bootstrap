const shelljs = require('shelljs')
const help_message = require('../src/help.message')
const error = require('../src/error')

const exec = (options) =>
    shelljs.exec(`node src/index.js ${options}`, { silent: true })

const getConfigFile = (file) => `__tests__/fixtures/${file}.yaml`

const readBashFile = (file) =>
    shelljs.exec(`cat __tests__/expected/${file}.bash`, { silent: true }).stdout

const getTestDescrition = (file) =>
    shelljs
        .exec(`__tests__/fixtures/${file}.yaml`, { silent: true })
        .stdout.split('\n')[0]

const getStrArray = (str) => {
    return str
        .split('\n')
        .filter((el) => typeof el !== 'undefined' && el.length > 0)
}

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
const best_cases = [
    ['bash_1', 'osb_1', getTestDescrition('osb_1'), 0],
    ['bash_2', 'osb_2', getTestDescrition('osb_2'), 0],
    ['bash_3', 'osb_3', getTestDescrition('osb_3'), 0],
]

describe('command:get-script', function () {
    test('command:get-script required config file not found on filesystem', async () => {
        const { stderr, code } = exec(
            `get-script --config-file /file-not-found`
        )
        expect(code).toBe(error.error_code.NoConfigurationFilePresentsCode)
        expect(stderr).toContain('no config file')
        expect(stderr).toContain('presents on the filesystem')
    })

    test('command:get-script empty config file ', async () => {
        const { stderr, code } = exec(
            `get-script --config-file ${getConfigFile('empty_config_file')}`
        )
        expect(code).toBe(error.error_code.EmptyConfigurationFileCode)
        expect(stderr).toContain('empty')
        expect(stderr).toContain('please first run the wizard command')
        expect(stderr).toContain('osb wizard')
    })

    test.each(best_cases)(
        'should return bash %s when config file %s: %s',
        async (bash_output, configFile, description, statuscode) => {
            const { stderr, stdout, code } = exec(
                `get-script --config-file ${getConfigFile(configFile)}`
            )
            expect(code).toBe(statuscode)
            const stdoutArr = getStrArray(stdout)
            const expectedArray = getStrArray(readBashFile(bash_output))
            expect(stdoutArr.length).toBeGreaterThan(0)
            expect(expectedArray.length).toBeGreaterThan(0)
            expect(stdoutArr).toEqual(expect.arrayContaining(expectedArray))
        }
    )
})
