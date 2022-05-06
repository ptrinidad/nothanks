// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const esModules = ['uuid'].join('|');

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules','<rootDir>/'],
  //moduleFileExtensions: ["ts", "tsx", "js", "mjs", "cjs", "jsx", "json", "node"],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [`\/node_modules\/(?!${esModules})`],
  transform: {},
  globals : {
    'ts-jest': {
        tsConfig: 'tsconfig.json',
        diagnostics: false,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
