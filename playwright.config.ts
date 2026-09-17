import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 30000, fullyParallel: false,
  use: { baseURL: process.env.SITE_URL ?? 'http://127.0.0.1:4321', headless: true,
    launchOptions: process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : {} },
  reporter: 'list',
});
