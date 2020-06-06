const assert = require('assert')
const parse_depencencies = require('../dependency_parser')

const run_cmd_linux = 'apt-get install '
const os_name_linux = 'linux'

const run_cmd_darwin = 'brew install '
const os_name_darwin = 'darwin'

// standalone dependency
const arr_1 = ['xclip', 'tree']
const expected_for_linux = ['apt-get install xclip', 'apt-get install tree']
const expected_for_darwin = ['brew install xclip', 'brew install tree']

// os specific depencies with default ( detected ) install command
const arr_2 = [
    { xclip: { os: { name: 'linux' } } },
    { pbcopy: { os: { name: 'darwin' } } },
]

// os specific depencies with provided installation command
const expected_provided_cmd_for_linux = [
    'provided_installation_command_for_linux',
]
const expected_provided_cmd_for_darwin = [
    'provided_installation_command_for_darwin',
]
const arr_3 = [
    {
        xclip: {
            os: {
                name: 'linux',
                command: 'provided_installation_command_for_linux',
            },
        },
    },
    {
        pbcopy: {
            os: {
                name: 'darwin',
                command: 'provided_installation_command_for_darwin',
            },
        },
    },
]

// arrays of dependency
const arr_4 = [['mysql-client', 'mysql-server', 'mysql-common']]
const arr_4_expected = [
    'apt-get install mysql-client',
    'apt-get install mysql-server',
    'apt-get install mysql-common',
]

describe('Dependencies Parser', () => {
    it('Standalone dependencies', () => {
        const ret_linux = parse_depencencies(
            arr_1,
            run_cmd_linux,
            os_name_linux
        )
        const ret_darwin = parse_depencencies(
            arr_1,
            run_cmd_darwin,
            os_name_darwin
        )
        expect(ret_linux).to.include.members(expected_for_linux) // fix it
        expect(ret_darwin).to.include.members(expected_for_darwin)
    })

    it('OS specific installation without provided installation command/ Darwin', () => {
        const ret_darwin = parse_depencencies(
            arr_2,
            run_cmd_darwin,
            os_name_darwin
        )
        expect(ret_darwin).to.have.lengthOf(1)
        expect(ret_darwin).to.include.members(['brew install pbcopy'])
    })

    it('OS specific installation without provided installation command/ Linux', () => {
        const ret_darwin = parse_depencencies(
            arr_2,
            run_cmd_linux,
            os_name_linux
        )
        expect(ret_darwin).to.have.lengthOf(1)
        expect(ret_darwin).to.include.members(['apt-get install xclip'])
    })

    it('OS specific installation with provided installation command/ Darwin', () => {
        const ret_darwin = parse_depencencies(
            arr_3,
            run_cmd_darwin,
            os_name_darwin
        )
        expect(ret_darwin).to.have.lengthOf(1)
        expect(ret_darwin).to.include.members(expected_provided_cmd_for_darwin)
    })

    it('OS specific installation with provided installation command/ Linux', () => {
        const ret_linux = parse_depencencies(
            arr_3,
            run_cmd_linux,
            os_name_linux
        )
        expect(ret_linux).to.have.lengthOf(1)
        expect(ret_linux).to.include.members(expected_provided_cmd_for_linux)
    })

    it('Array of dependencies', () => {
        const ret_linux = parse_depencencies(
            arr_4,
            run_cmd_linux,
            os_name_linux
        )
        expect(ret_linux).to.have.lengthOf(3)
        expect(ret_linux).to.include.members(arr_4_expected)
    })
})
