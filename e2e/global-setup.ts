import {chromium, FullConfig} from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login')
  await page.locator('#inputgroup1').type('user')
  await page.locator('#inputgroup2').type('password')
  await page.locator('text=LOGIN').click()

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
