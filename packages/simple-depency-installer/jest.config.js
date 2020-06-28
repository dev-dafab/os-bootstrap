const base = require('../../jest.config.base.js')
const pack = require('./package')

module.exports = {
    ...base,
    displayName: pack.name,
    name: pack.name,
    rootDir: '../..',
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
}
