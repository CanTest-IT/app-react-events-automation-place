import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/login');
});

test.skip('TEST - to have text', async ({page}) => {
  await expect(page.locator('h4')).toHaveText('Welcome');
});

test.skip('TEST - to have text - FAIL', async ({page}) => {
  await expect(page.locator('h4')).toHaveText('Hello', {
    timeout: 1000
  });
});

test.skip('TEST - not to have text', async ({page}) => {
  await expect(page.locator('h4')).not.toHaveText('Welcome');
});

test.skip('TEST - soft expect', async({page}) => {
  await expect.soft(page.locator('h4')).toHaveText('Welcome');
  await expect(page.locator('.pages-detail')).toHaveText('Please use the form to sign-in Cantest network');
});

test('TEST - custom message', async ({page}) => {
  await expect(page.locator('h4'), "Header text should be 'Welcome'.").toHaveText('Welcome');
});
