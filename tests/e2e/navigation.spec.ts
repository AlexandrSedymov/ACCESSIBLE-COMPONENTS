import { test, expect } from '@playwright/test';

test('home page has correct title and navigation', async ({ page }) => {
  await page.goto('/');
  
  // Check the title
  await expect(page).toHaveTitle('Accessibility Components - Learn & Build Accessible UI');
  
  // Check if navigation exists
  const nav = page.getByRole('navigation');
  await expect(nav).toBeVisible();
});