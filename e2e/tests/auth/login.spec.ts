import {expect, test} from '@playwright/test'
import { LoginPage } from '../../pages'
import { getUser, Users } from '../../config'

let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
})

test.skip('A | User should be able to log in', async ({page}) => {
  await page.goto('/login');

  await page.getByTestId('username-input').type('user');
  await page.getByTestId('password-input').type('password');

  await page.getByTestId('login-btn').click();

  await expect(page.getByTestId('user-name-text')).toHaveText('Event Manager')
})

test('B | User should be able to log in', async ({page}) => {
  const {fullName} = getUser(Users.Standard);
  await loginPage.login(Users.Standard);

  await expect(page.getByTestId('user-name-text')).toHaveText(fullName)
})
