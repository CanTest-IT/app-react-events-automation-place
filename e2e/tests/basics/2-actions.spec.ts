import { expect, test } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/login');
})

test.skip('Test - type value to input', async ({page}) => {
  // await page.getByTestId('login-input').type('user');
  await page.getByTestId('login-input').fill('user');

  await page.waitForTimeout(2 * 1000);
})

test.skip('Test - focus', async ({page}) => {
  await page.getByTestId('login-input').focus();

  await page.waitForTimeout(1 * 1000);
})

test.skip('Test - skip', async ({page}) => {
  await page.getByTestId('login-btn').click();

  await page.waitForTimeout(1 * 1000);
})

test.skip('Test - hover', async ({page}) => {
  await page.getByTestId('login-btn').hover();

  await page.waitForTimeout(1 * 1000);
})

test.skip('Test - targets', async ({page}) => {
  // await page.getByText('Events', {exact: true})
  await page.locator('xpath=//button').click();
  
  await page.getByText('Save');
  await page.locator('text=Save');

  await page.getByTestId('username-input');
  await page.locator('data-test-id=username-input');
})

test.skip('Test - get input value', async ({page}) => {
  await page.getByTestId('login-input').type('user');

  const inputValue = await page.getByTestId('login-input').inputValue()

  console.log(inputValue)

  await page.waitForTimeout(1);
})

test('Test - title', async ({page}) => {
  const title = await page.title()

  // await expect(page.getByTestId('username-input')).toHaveText('CanTest network')
  expect(title).toBe('CanTest network')
})
