// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,  // Enable code coverage
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',  // Specify which files to collect coverage for
    '!src/**/*.d.ts',  // Exclude TypeScript declaration files
  ],
  coverageReporters: ['text', 'lcov'],  // Report formats
};
