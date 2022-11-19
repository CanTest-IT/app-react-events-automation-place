import {expect, Locator, Page} from '@playwright/test';

type Event = {
  title: string;

}

type Card = {title: string | null; price: string | null; date: string | null;}

export class EventsPage {
  readonly page: Page;
  readonly addEventBtn: Locator;

  readonly eventTitleInput: Locator;
  readonly eventCategoryDropdown: Locator;
  readonly eventCategoryDropdownElement: Locator;
  readonly eventPriceInput: Locator;
  readonly eventDateFromInput: Locator;
  readonly eventDateToInput: Locator;

  readonly saveEventBtn: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.addEventBtn = page.locator('text=New')

    this.eventTitleInput = page.locator('#name')
    this.eventCategoryDropdown = page.locator('#category')
    this.eventCategoryDropdownElement = page.locator('.p-dropdown-items li')
    this.eventPriceInput = page.locator('#price > input')
    this.eventDateFromInput = page.locator('#dateFrom')

    this.saveEventBtn = page.locator('text=Save');
    // await this.page.getByTestId('')
  }

  async goto() {
    await this.page.goto('/');
  }

  async addNewEvent(event: Event) {
    await this.addEventBtn.click();

    await page.locator('.p-dialog').locator('id=name').type(title)
    
    await page.locator('#category').click()
    await page.locator('.p-dropdown-items li').filter({hasText: 'Festival'}).click()

    await page.locator('#price input').type('500')

    await page.locator('#dateFrom').click()
    await page.locator('.p-datepicker-calendar').filter({hasText: '29'}).first().click();

    await page.locator('#dateTo').click()
    await page.locator('.p-datepicker-calendar').filter({hasText: '30'}).first().click();

    await page.locator('data-test-id=1-image').click();

    await this.saveEventBtn.click()
  }

  async getEvents(): Promise<Card[]> {
    const cardsArr: Card[] = [];
    const cards = await this.page.locator('.p-dataview-content .card').elementHandles()
    
    for(const card of cards) {
      const title = await card.$eval('.text-xl', el => el.textContent);
      const date = await card.$eval('.pi-calendar ~ small', el => el.textContent);
      const price = await card.$eval('.pi-money-bill ~ small', el => el.textContent);

      cardsArr.push({
        title, price, date
      })
    }

    return cardsArr;
  }

  async deleteAllEvents() {
    await this.page.locator('.p-dataview-content .card').first().waitFor()
    const items = await this.page.locator('.card .pi-trash').count();
    console.log({items});

    if(items > 0) {
      const elements = this.page.locator('.card .pi-trash')

      for (let i = 0; i < items; i++) {
        await elements.first().click();
        await this.page.getByText('Yes').click()
        // await this.page.locator('text=Yes').click()
        await this.page.waitForTimeout(500)
      }
    }
  } 
}
