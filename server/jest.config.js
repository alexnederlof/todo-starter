module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/?(*.)+(test).+(ts)', '**/?(*.)+(test).+(ts)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  globalTeardown: '<rootDir>/src/__tests__/test_util/globalTeardown.ts',
};
