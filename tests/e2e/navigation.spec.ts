import { test, expect } from '@playwright/test';

test('home page has correct title and navigation', async ({ page }) => {
  await page.goto('/');
  
  // Check the page title (in browser tab)
  await expect(page).toHaveTitle('Accessibility Components - Learn & Build Accessible UI');
  
  // Check if navigation exists
  const nav = page.getByRole('navigation');
  await expect(nav).toBeVisible();

  // Check the main heading within main content area
  const main = page.getByRole('main');
  await expect(main).toBeVisible();
  
  const mainHeading = main.getByRole('heading', { level: 1 });
  await expect(mainHeading).toBeVisible();
  await expect(mainHeading).toHaveText('Welcome to accessible components playground');
});