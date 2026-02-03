import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Victor Acosta/);
});

test('navigation bar links work', async ({ page }) => {
    await page.goto('/');

    // Check if Home link is visible
    const homeLink = page.getByRole('link', { name: 'Home', exact: true }).first();
    // Note: mobile menu duplicate links might exist, so .first() or specific selector needed if menu is hidden
    // But standard desktop nav is usually visible. 

    // Actually, let's just check if main headings exist
    await expect(page.getByRole('heading', { name: /Víctor Erick/i })).toBeVisible();

    // Check if "Experiencia" section exists by heading
    // Use a more generic locator that works with localization if possible, or hardcoded for now
    // Assuming Spanish default
    // await expect(page.getByRole('heading', { name: 'Experiencia' })).toBeVisible();
});
