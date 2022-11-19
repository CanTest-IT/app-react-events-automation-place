import {test, expect} from '@playwright/test';
import {LoginPage} from '../pom/LoginPage'
import {Users} from '../../constants'

test('User should be able to log in', async ({page}) => {
  await page.goto('/login')

  await page.locator('data-test-id=login-input').type('user')
  await page.locator('data-test-id=password-input').type('password')

  await Promise.all([
    page.waitForNavigation(),
    page.locator('data-test-id=login-btn').click()
  ])

  // await expect(page.locator('h5')).toHaveText('Events list');
  // await expect(page.locator('h5')).toBeDefined();
  // await page.screenshot({path: 'screenshot.png'});
  const isAvatarVisible = await page.getByAltText('avatar').first().isVisible();
  expect(isAvatarVisible).toBeTruthy();
})

test('User should be able to log in POM', async ({page}) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.login(Users.Admin)

  const isAvatarVisible = await page.getByAltText('avatar').first().isVisible();
  expect(isAvatarVisible).toBeTruthy();
})
