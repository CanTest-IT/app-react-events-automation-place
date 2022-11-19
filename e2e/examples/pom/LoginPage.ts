import {Locator, Page} from '@playwright/test';
import { Users } from '../../constants';
import {getUser} from '../../config'

export class LoginPage {
  readonly page:Page;

  private loginInput: Locator;
  private passwordInput: Locator;
  private loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginInput = page.getByTestId('login-input')
    this.passwordInput = page.getByTestId('passowrd-input')
    this.loginBtn = page.getByTestId('login-btn')
  }

  async login(user: Users) {
    const {email, password} = getUser(user);

    await this.page.goto('/login')
    await this.loginInput.type(email)
    await this.passwordInput.type(password)

    await Promise.all([
      this.page.waitForNavigation(),
      this.loginBtn.click()
    ])
  }
}
