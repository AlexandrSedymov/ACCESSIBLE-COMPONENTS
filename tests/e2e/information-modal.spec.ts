import { test, expect } from '@playwright/test';

test('should open and interact with information modal dialog', async ({ page }) => {
  await page.goto('/');
  
  // Verify navigation contains the Modal Dialog link
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Modal Dialog' })).toBeVisible();
  
  // Navigate to Modal Dialog page
  await page.getByRole('link', { name: 'Modal Dialog' }).click();
  
  // Verify page heading
  await expect(page.getByRole('heading', { name: 'Accessible Modal Dialog Examples', level: 1 })).toBeVisible();
  
  // Open the information modal
  await page.getByRole('button', { name: 'Open Information Modal' }).click();
  
  // Verify modal is open and interact with it
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  
  // Submit the modal
  await dialog.getByRole('button', { name: 'Submit' }).click();
  
  // Verify modal is closed
  await expect(dialog).not.toBeVisible();
});