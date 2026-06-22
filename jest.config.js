const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
    '<rootDir>/src/__tests__/helpers/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setupFilesAfterEnv.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(s?css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf|svg|avif)$':
      '<rootDir>/jest/moduleMapper/fileMock.js',
  },
  collectCoverageFrom: [
    'src/api/**/*.ts',
    'src/lib/safety/**/*.ts',
    'src/lib/conversation.ts',
    'src/lib/display.ts',
    'src/components/**/*.{ts,tsx}',
    '!src/**/index.ts',
    '!src/middleware.ts',
    '!src/lib/react-query.ts',
  ],
  coverageReporters: ['text-summary', 'json-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
