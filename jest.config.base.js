module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'lcov'
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'node'
  ],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
