import { Page, Locator } from "@playwright/test";

class SideMenu {
  page: Page;
  logoutBtn: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.logoutBtn = page.getByTestId('logout-btn')
  }

  async logout() {
    // ...
  }
}

class EventsList {
  page: Page;
  addNewEventBtn: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.addNewEventBtn = page.getByTestId('add-new-event-btn')
  }
}

export class EventsPage {
  page: Page;

  // sideMenu: SideMenu;
  // eventsList: EventsList;

  sideMenuUserBtn: Locator;
  sideMenuLogoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sideMenuUserBtn = page.getByTestId('side-menu-user-btn')
    this.sideMenuLogoutBtn = page.getByTestId('side-menu-logout-btn')

    // this.sideMenu = new SideMenu(page);
    // this.eventsList = new EventsList(page);
  }

  async logout() {
    await this.sideMenuUserBtn.click();

    await Promise.all([
      this.page.waitForNavigation({
        waitUntil: 'networkidle'
      }),
      this.sideMenuLogoutBtn.click()
    ])
  }
}
