import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/login')
})

test.skip('Test - To have text', async ({page}) => {
  await expect(page.locator('h4')).toHaveText('Welcome')
})

test.skip('Test - not to have text', async ({page}) => {
  const header = page.locator('h4');
  await header.highlight();

  await expect(header).not.toHaveText('Welcome')
})

test.skip('Test - assertion soft', async ({page}) => {
  await expect.soft(page.locator('h4')).toHaveText('Hello')
  await expect(page.locator('.pages-detail')).toHaveText('Please use the form to sign-in Cantest network')
})

test.skip('Test - assertion', async ({page}) => {
  await expect(page.locator('h4')).toHaveText('Hello')
  await expect(page.locator('.pages-detail')).toHaveText('TEST network')
})

test.skip('Test - custom message', async ({page}) => {
  await expect(page.locator('h4'), "Header text should be 'Welcome'").toHaveText("Hello")
})

test('Test - toContain', async ({page}) => {
  const header = await page.locator('h4').textContent()

  expect(["Hello", "Welcome"]).toContain(header)
})
