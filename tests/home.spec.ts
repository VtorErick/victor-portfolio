import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Victor Acosta/);
});

test('navigation bar links work', async ({ page }) => {
    await page.goto('/');

    // Check if main heading exists
    await expect(page.getByRole('heading', { name: /Víctor Erick/i })).toBeVisible();
});
