import { test, expect } from '@playwright/test';

/**
 * Tests Smoke - Vérification que les pages principales se chargent
 * Ces tests sont rapides et détectent les régressions majeures
 */

test.describe('Smoke Tests - Pages Publiques', () => {
  
  test('Page accueil se charge correctement', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier le titre
    await expect(page).toHaveTitle(/Perrine Huon/);
    
    // Vérifier que le header est présent
    await expect(page.locator('header')).toBeVisible();
    
    // Vérifier le CTA principal
    await expect(page.getByRole('button', { name: /c'est parti/i })).toBeVisible();
  });

  test('Page Portfolio se charge', async ({ page }) => {
    await page.goto('/portfolio');
    
    // Vérifier le titre de la page
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('Page Blog se charge', async ({ page }) => {
    await page.goto('/blog');
    
    // Vérifier que la page charge
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('Page FAQ se charge', async ({ page }) => {
    await page.goto('/faq');
    
    // Vérifier que la page charge
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('Page Mentions légales se charge', async ({ page }) => {
    await page.goto('/mentions-legales');
    
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('Page Politique de confidentialité se charge', async ({ page }) => {
    await page.goto('/politique-confidentialite');
    
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('Smoke Tests - Navigation', () => {
  
  test('Navigation header fonctionne', async ({ page }) => {
    await page.goto('/');
    
    // Cliquer sur Portfolio dans le header
    await page.getByRole('link', { name: 'Portfolio' }).first().click();
    
    // Vérifier qu'on est sur la page portfolio
    await expect(page).toHaveURL('/portfolio');
  });

  test('Logo redirige vers accueil', async ({ page }) => {
    await page.goto('/portfolio');
    
    // Cliquer sur le logo
    await page.locator('header').getByRole('link').first().click();
    
    // Vérifier qu'on est sur l'accueil
    await expect(page).toHaveURL('/');
  });
});

test.describe('Smoke Tests - Admin', () => {
  
  test('Admin redirige vers login si non connecté', async ({ page }) => {
    await page.goto('/admin');
    
    // Doit rediriger vers login
    await expect(page).toHaveURL('/admin/login');
  });

  test('Page login admin se charge', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Vérifier le formulaire de connexion
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /connecter/i })).toBeVisible();
  });
});

test.describe('Smoke Tests - Sécurité API', () => {
  
  test('API generate-content retourne 401 sans auth', async ({ request }) => {
    const response = await request.post('/api/generate-content', {
      data: { title: 'Test', type: 'excerpt' }
    });
    
    expect(response.status()).toBe(401);
  });

  test('API generate-image retourne 401 sans auth', async ({ request }) => {
    const response = await request.post('/api/generate-image', {
      data: { title: 'Test' }
    });
    
    expect(response.status()).toBe(401);
  });
});




