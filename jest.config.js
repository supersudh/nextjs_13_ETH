const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const esModules = [
  '@wagmi',
  'wagmi',
  'preact',
  'isows',
  'uint8arrays',
  'multiformats'
].join('|');

// Add any custom config to be passed to Jest
const customJestConfig = {
};

module.exports = {
  ...createJestConfig(customJestConfig),
  "globals": {
    "ts-jest": {
      "tsconfig": "./tsconfig.test.json"
    }
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json'
      }
    ],
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  moduleNameMapper: {
    '^.+.scss$': 'identity-obj-proxy'
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
