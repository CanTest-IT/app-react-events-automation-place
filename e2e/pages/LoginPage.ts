import { Locator, Page } from "@playwright/test";
import { getUser, Users, User } from "../config/users";

export class LoginPage {
  page: Page;

  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = this.page.getByTestId('username-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(user: Users = Users.Admin): Promise<User> {
    const dbUser = getUser(user);

    await this.usernameInput.type(dbUser.username);
    await this.passwordInput.type(dbUser.password);

    await this.loginButton.click();

    return dbUser;
  }
}
