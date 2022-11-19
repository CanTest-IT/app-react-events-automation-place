import {test, expect} from '@playwright/test'

test.describe('Events', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/login')

    await page.locator('data-test-id=login-input').type('user')
    await page.locator('data-test-id=password-input').type('password')
  
    await page.locator('data-test-id=login-btn').click()
  })

  test('Should be able to add event', async ({page}) => {
    const title =  `TEST-${Date.now()}`;

    await page.locator('text=New').click()

    await page.locator('.p-dialog').locator('id=name').type(title)
    
    await page.locator('#category').click()
    await page.locator('.p-dropdown-items li').filter({hasText: 'Festival'}).click()

    await page.locator('#price input').type('500')

    await page.locator('#dateFrom').click()
    await page.locator('.p-datepicker-calendar').filter({hasText: '29'}).first().click();

    await page.locator('#dateTo').click()
    await page.locator('.p-datepicker-calendar').filter({hasText: '30'}).first().click();

    await page.locator('data-test-id=1-image').click();

    await page.locator('text=Save').click()

    await page.screenshot({
      path: 'full-page-screenshot.png',
      fullPage: true
    })

    await expect(page.locator('text=Event saved')).toBeVisible()
    await expect(page.locator(`text=${title}`)).toBeVisible()
  })
})
