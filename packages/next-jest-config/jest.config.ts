/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: process.env.NEXT_APP_PATH,
});

const getTsConfigPath = () => {
  const tsConfig = require(process.env.NEXT_APP_PATH + '/tsconfig.json');
  const { paths } = tsConfig.compilerOptions as { paths: Record<string, string[]> };

  const moduleNameMapper = {} as Record<string, string[]>;

  if (!paths) {
    return {};
  }

  Object.keys(paths).forEach((path) => {
    const key = path.replace('/*', '/(.*)');
    const value = (paths[path] || []).map((p) => `<rootDir>/${p.replace('/*', '/$1')}`);
    moduleNameMapper[`^${key}$`] = value;
  });

  return moduleNameMapper;
};

const config: Config = {
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: { ...getTsConfigPath() },

  // The root directory that Jest should scan for tests and modules within
  rootDir: process.env.NEXT_APP_PATH,

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [process.cwd() + '/jest.setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/**/?(*.)+(spec|test).[tj]s?(x)'],
};

const nextJestConfig = createJestConfig(config) as () => Promise<Config>;

export default nextJestConfig;
