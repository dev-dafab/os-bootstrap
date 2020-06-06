#!/usr/bin/env node
const { program } = require('commander');
const {test, mkdir, touch, exec} = require('shelljs');
const {resolve} = require('path');
var fs = require('fs');

const test_string = `
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});
`;

program
    .option('-n, --name <type>', 'name of the submodule')
    .option('-type, --type [type]', 'type configurator or installer');

program.parse(process.argv);

const name = program.name;
const type = program.type;
const path = resolve( __dirname, '..', `packages/${name}-${type}`);

const yaml_string = `
id: ${name}.${type}
name: ${name}${type}
author:
Objects:
`;

const jest_config = `
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
     "lcov",
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "node"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
};
`;

const package_string = `
{
  "name": "${name}-${type}",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "lint-js": "prettier --check '**/*.js'",
    "lint-yaml": "echo lint-yaml",
    "lint-fix": "prettier --write '**/*.js' && echo lint-yaml-fix",
    "pretest": "npm run lint-js && npm run lint-yaml",
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^26.0.1",
    "jsdoc": "^3.6.4",
    "prettier": "^2.0.5",
    "yaml-schema-validator": "^1.2.2",
    "inquirer": "^7.1.0"
  }
}
`;


if (!test('-d', path)) {
    mkdir('-p', path);

    touch(resolve(path, 'index.js'));
    touch(resolve(path, `${name}.${type}.yaml`));
    fs.writeFileSync(resolve(path, `${name}.${type}.yaml`), yaml_string, 'utf8');

    touch(resolve(path, 'jest.config.js'));
    fs.writeFileSync(resolve(path, 'jest.config.js'), jest_config, 'utf8');

    mkdir('-p', resolve(path, 'test'));
    touch(resolve(path, 'test/index.test.js'));
    fs.writeFileSync(resolve(path, 'test/index.test.js'), test_string, 'utf8');

    exec(`cd ${path} && yarn init -y`)
    exec(`cd ${path} && yarn add jest jsdoc prettier yaml-schema-validator inquirer -D`)
}

