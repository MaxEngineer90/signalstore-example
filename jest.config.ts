import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/spectator-setup.ts'],
  testEnvironment: "jsdom",
};

export default config;
