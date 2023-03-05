import { test } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/login');
})

test.skip('TEST - type value to input', async({page}) => {
  await page.getByTestId('username-input').type('user');
});

test.skip('TEST - click', async({page}) => {
  await page.getByTestId('login-button').click();
});

test.skip('TEST - focus', async ({page}) => {
  await page.getByTestId('password-input').focus();
});

test.skip('TEST - get input value', async ({page}) => {
  await page.getByTestId('username-input').type('user');

  const inputValue = await page.getByTestId('username-input').inputValue();

  console.log(inputValue);
});

test('TEST - locator', async({page}) => {
  await page.getByRole('heading', { name: 'Welcome' }).highlight();

  await page.waitForTimeout(500);

  // Target by TEXT
  await page.getByText('LOGIN').click();

  // Target by TEXT
  await page.locator('text=LOGIN').click();

  // Target by CSS class
  await page.locator('.login-button').click();
});
