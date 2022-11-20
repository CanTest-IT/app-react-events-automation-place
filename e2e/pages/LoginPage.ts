import { Locator, Page } from '@playwright/test';
import { getUser, Users } from '../config'

export class LoginPage {
  page: Page;

  usernameInput: Locator;
  passwordInput: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByTestId('username-input')
    this.passwordInput = page.getByTestId('password-input')
    this.loginBtn = page.getByTestId('login-btn')
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(user: Users = Users.Admin) {
    await this.goto();

    const {username, password} = getUser(user);

    await this.usernameInput.type(username);
    await this.passwordInput.type(password);

    await Promise.all([
      this.page.waitForNavigation({
        waitUntil: 'networkidle'
      }),
      this.loginBtn.click(),
    ]);
  }
}

