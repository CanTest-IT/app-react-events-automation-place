import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/login')

  await page.locator('data-test-id=login-input').type('user')
  await page.locator('data-test-id=password-input').type('password')

  await page.locator('data-test-id=login-btn').click()
})

test('TO HAVE TEXT1', async ({page}) => {
  await expect(page.locator('h5')).toHaveText('Events list')
})

test('NOT TO HAVE TEXT', async ({page}) => {
  await expect(page.locator('h5')).not.toHaveText('Events list')
})

test('TO HAVE TEXT', async ({page}) => {
  await expect.soft(page.locator('h5')).toHaveText('1')
  await expect.soft(page.locator('h5')).toHaveText('2')
  await expect.soft(page.locator('h5')).toHaveText('3')
  await expect(page.locator('h5')).toHaveText('4')
})

test('CUSTOM MSG', async ({page}) => {
  await expect(page.locator('h5'), 'Should be "Events list"').toHaveText('4')
})


test('VARIOUS ASSERTIONS', async ({page}) => {
  await expect(page.locator('h5')).toBeDefined();
  await expect(page.locator('h5')).toMatchObject({name: "elo"})
  await expect(page.locator('h5')).toContainText('4')
})
