import {test, expect} from '@playwright/test';

// -------------
// Simple Test

test('Test', async ({page}) => {
  console.log('Test')
})


// -------------
// Test ONLY

test.only('Test - only', async ({page}) => {
  console.log('Test - only')
})

// -------------
// Test SKIP

test.skip('Test - skip', async ({page}) => {
  console.log('Test - skip')
})

// -------------
// Test SKIP Conditionally

test('Test - skip chromium', async ({page, browserName}) => {
  test.skip(browserName === 'chromium', 'Skipping chromium')
})

// -------------
// Test GROUP

test.describe('Test - group', () => {
  test('Test - group 1', async ({page}) => {
    console.log('Test - group 1')
  })

  test('Test - group 2', async ({page}) => {
    console.log('Test - group 2')
  })
})

// -------------
// Test TAG

// npx playwright test --grep @high - run only tests with tags @high
// npx playwright test --grep-inverst @high - skip the test with tag @high
test('Test - @tag @high', async ({page}) => {
  console.log('Test - @tag @high')
})

// -------------
// Test GROUP - skip conditually

test.describe('Test - group', () => {
  test.skip(({browserName}) => browserName !== 'chromium', 'Chromium only!')

  test('Test - group 1', async ({page}) => {
    console.log('Test - group 1')
  })

  test('Test - group 2', async ({page}) => {
    console.log('Test - group 2')
  })
})

// -------------
// Test fixme only on mobile

// Not run beforeEach hook on if isMobile === true
test.beforeEach(async ({ page, isMobile }) => {
  test.fixme(isMobile === true, 'Settings page does not work in mobile yet');

  await page.goto('http://localhost:3000/settings');
});

test('Test - fixme', async ({ page }) => {
  console.log('Test - fixme')
});
