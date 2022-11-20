import { test } from '@playwright/test';

// Test
test('TEST', async () => {
  console.log('Test')
});

// Test ONLY
// test.only('TEST - only', async () => {
//   console.log('Test - only')
// })

// Test SKIP
test.skip('Test - skip', async () => {
  console.log('Test - skip')
})

test('Test - skip browser', async ({browserName}) => {
  test.skip(browserName === 'chromium', "Skipping chromium browser...")

  console.log(`Test - skip browser. Running on: ${browserName}.`)
})

// Test GROUPS
test.describe('Test - group', () => {
  test('Test - group 1', async () => {
    console.log('Test - group 1')
  })

  test('Test - group 2', async () => {
    console.log('Test - group 2')
  })
})

// Test GROUPS
test.describe('Test - group skip', () => {
  test.skip(({browserName}) => browserName === 'chromium', 'Skipping chromium browser...')

  test('Test - group skip 1', async ({browserName}) => {
    console.log(`Test - group skip 1, run on: ${browserName}`)
  })

  test('Test - group skip 2', async ({browserName}) => {
    console.log(`Test - group skip 2, run on: ${browserName}`)
  })
})

// Test @tag
test('Test - tag: @smoke', async () => {
  console.log('Test - tag: @smoke')
})
