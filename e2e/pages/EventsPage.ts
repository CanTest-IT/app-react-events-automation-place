import {Locator, Page, expect} from '@playwright/test';
import { User } from '../config/users';

export class EventsPage {
  page: Page;
  username: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = this.page.getByTestId('username-text');
  }

  async verifyUser(user: User): Promise<void> {
    await expect(this.username).toHaveText(`${user.firstName} ${user.lastName}`)
  }
}
