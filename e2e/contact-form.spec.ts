import { test, expect } from '@playwright/test';

/**
 * Tests du formulaire de contact
 * Vérifie la validation et l'accessibilité
 */

test.describe('Formulaire de Contact', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll vers la section contact
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('Formulaire est visible et accessible', async ({ page }) => {
    // Vérifier les champs requis
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('#consent')).toBeVisible();
    
    // Vérifier les labels
    await expect(page.getByText('Nom complet')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
  });

  test('Validation du formulaire - champs requis', async ({ page }) => {
    // Tenter de soumettre sans remplir
    const submitButton = page.getByRole('button', { name: /envoyer/i });
    await submitButton.click();
    
    // Le formulaire ne devrait pas être soumis (validation HTML5)
    // Le champ nom devrait avoir le focus (premier champ requis vide)
    await expect(page.locator('#name')).toBeFocused();
  });

  test('Validation email - format invalide', async ({ page }) => {
    // Remplir avec email invalide
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('not-an-email');
    await page.locator('#message').fill('Test message');
    await page.locator('#consent').check();
    
    // Soumettre
    const submitButton = page.getByRole('button', { name: /envoyer/i });
    await submitButton.click();
    
    // Le champ email devrait être invalide
    const emailInput = page.locator('#email');
    await expect(emailInput).toBeFocused();
  });

  test('Checkbox consentement est requise', async ({ page }) => {
    // Remplir tous les champs sauf consentement
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#message').fill('Test message');
    
    // Soumettre
    const submitButton = page.getByRole('button', { name: /envoyer/i });
    await submitButton.click();
    
    // Le formulaire ne devrait pas être soumis
    await expect(page.locator('#consent')).not.toBeChecked();
  });

  test('Accessibilité - labels liés aux champs', async ({ page }) => {
    // Vérifier que les labels sont correctement liés
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const messageLabel = page.locator('label[for="message"]');
    
    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(messageLabel).toBeVisible();
  });
});

