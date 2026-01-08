import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour tests E2E
 * Documentation: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Dossier des tests
  testDir: './e2e',
  
  // Exécution en parallèle
  fullyParallel: true,
  
  // Fail la CI si test.only() est présent
  forbidOnly: !!process.env.CI,
  
  // Retries uniquement en CI
  retries: process.env.CI ? 2 : 0,
  
  // Workers limités en CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  
  // Configuration partagée
  use: {
    // URL de base
    baseURL: 'http://localhost:3000',
    
    // Traces et screenshots en cas d'échec
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    
    // Viewport par défaut
    viewport: { width: 1280, height: 720 },
  },

  // Projets de test (navigateurs)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Démarrer le serveur de dev avant les tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});



