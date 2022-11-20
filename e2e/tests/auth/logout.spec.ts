import {test, expect} from '@playwright/test'
import { EventsPage, LoginPage } from '../../pages';

test.beforeEach(async ({page}) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.login();
})

test('User should be able to log out', async ({page}) => {
  const eventsPage = new EventsPage(page);

  await eventsPage.logout();

  await expect(page).toHaveURL(/.*login/)
})
