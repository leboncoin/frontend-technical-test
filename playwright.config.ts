import { defineConfig, devices } from '@playwright/test';

const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run start-server',
      url: 'http://localhost:3005/conversations/1',
      reuseExistingServer: !isCi,
      timeout: 120000,
    },
    {
      command: 'npm run dev -- --port 3100',
      url: 'http://localhost:3100',
      reuseExistingServer: !isCi,
      timeout: 120000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
