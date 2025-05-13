import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000, // 30s max par test
    retries: 1, // 1 retry en cas de flakiness
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        baseURL: 'http://localhost:3000', // adresse du front React
        trace: 'on-first-retry', // enregistre un trace si test échoue
        screenshot: 'only-on-failure', // capture sur échec
        video: 'retain-on-failure', // vidéo sur échec
        actionTimeout: 10 * 1000, // 10s max par action
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
    webServer: [

        // Démarre le backend Node
        {
            command: 'yarn workspace node start',
            port: 3001,
            reuseExistingServer: !process.env.CI,
        },

        // Démarre le frontend React
        {
            command: 'yarn workspace react-app start',
            port: 3000,
            reuseExistingServer: !process.env.CI,
        },
    ],
});