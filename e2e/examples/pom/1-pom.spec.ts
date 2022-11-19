import {test, expect} from '@playwright/test';
import {EventsPage} from './EventsPage'
import {LoginPage} from './LoginPage'

let eventsPage: EventsPage;

test.beforeEach(async ({page}) => {
  await page.goto('/')

  const loginPage = new LoginPage(page);
  loginPage.login();

  eventsPage = new EventsPage(page);
})

test('User should be able to receive events', async ({page}) => {
  await page.locator('.p-dataview-content .card').first().waitFor()

  const events = await eventsPage.getEvents();
  console.log({events})

  expect(events).toContainEqual({
    title: '111', price: '$1111', date: 'Invalid date'
  })
})
