import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/login')

  await page.getByTestId('login-input').type('user')
  await page.getByTestId('password-input').type('password')

  await Promise.all([
    page.waitForNavigation(),
    page.getByTestId('login-btn').click()
  ])
})


// TEXT INPUTS

test('Text Inputs', async ({page}) => {
  const loginInput = page.getByTestId('login-input')

  await loginInput.fill('USER');
  await loginInput.type('USER');
  await loginInput.focus();
  

  await page.waitForTimeout(5000)
})

// GET Elements

test('Get elements', async ({page}) => {
  await page.getAttribute('href', '/intro')

  // <img alt='Castle'>
  await page.getByAltText('Castle')

  // <label for="password-input">Password:</label>
  // <input id="password-input">
  await page.getByLabel('password-input');

  // <input placeholder="Country">
  await page.getByPlaceholder('Country');

  await page.getByRole('button')
  
  await page.getByTestId('password-input')

  await page.getByText('New')

  // <div>Hello <span>world</span></div>
  // <div>Hello</div>

  // Matches <span>
  page.getByText('world')

  // Matches first <div>
  page.getByText('Hello world')

  // Matches second <div>
  page.getByText('Hello', { exact: true })

  // Matches both <div>s
  page.getByText(/Hello/)

  // Matches second <div>
  page.getByText(/^hello$/i)

  // <button title='Place the order'>Order Now</button>
  await page.getByTitle('Place the order')

  await page.waitForTimeout(5000)
})

// ELEMENT HANDLES

test.only('Element Handles', async ({page}) => {
  await page.waitForTimeout(1000)
  
  const links = await page.locator('ul[role="menu"]:not(.layout-menu)').getByRole('menuitem').elementHandles()

  // for(const link of links) {
  //   console.log(await link.getAttribute('href'))
  // }

  for(const link of links) {
    console.log(await link.textContent())
  }

  // Zmiana kontekstu na przeglądarkę.
  await page.evaluate((x) => {
    console.log(x)
  }, 50)

  await page.getByText('Events list').highlight()

  await page.waitForTimeout(5000)
})



test('CLICK', async ({page}) => {
  await page.getByTestId('login-btn').click();

  await page.waitForTimeout(5000)
})

test('HOVER', async ({page}) => {
  await page.locator('data-test-id=login-btn').hover();

  await page.waitForTimeout(5000)
})

test('TYPE', async ({page}) => {
  await page.locator('data-test-id=login-input').type('user')

  await page.waitForTimeout(5000)
})

test('FILL', async ({page}) => {
  await page.locator('data-test-id=password-input').fill('password')

  await page.waitForTimeout(5000)
})

test('INPUT VALUE', async ({page}) => {
  await page.locator('data-test-id=login-input').type('user')

  const inputValue = await page.locator('data-test-id=login-input').inputValue()

  console.log({inputValue})

  await page.waitForTimeout(5000)
})

test('FILTER', async ({page}) => {
  await expect(page.locator('data-test-id=event-card-title').filter({hasText: 'Salt Wave 2022'})).toHaveCount(1)
})

test('ELEMENT HANDLES', async ({page}) => {
  await page.locator('data-test-id=event-card-title').nth(1).waitFor()

  const elements = await page.locator('data-test-id=event-card-title').elementHandles()

  for(const element of elements) {
    
    console.log(await element.innerText())
  }
})
