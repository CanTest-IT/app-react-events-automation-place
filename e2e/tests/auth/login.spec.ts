import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EventsPage } from '../../pages/EventsPage';

let loginPage: LoginPage;

test.beforeEach(async({page}) => {
  loginPage = new LoginPage(page);

  await loginPage.goto();
})

test.skip('A | User should be able to log in', async({page}) => {
  await page.getByTestId('username-input').type('user');
  await page.getByTestId('password-input').type('password');

  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('username-text')).toHaveText('Event Manager')
});

test('B | User hould be able to log in', async ({page}) => {
  const user = await loginPage.login();

  const eventsPage = new EventsPage(page);
  await eventsPage.verifyUser(user);
});
