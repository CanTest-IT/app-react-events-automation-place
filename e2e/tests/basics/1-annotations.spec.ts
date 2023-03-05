import { test } from '@playwright/test';

test('TEST', async () => {
  console.log('TEST');
})

// test.only('TEST - ONLY', async () => {
//   console.log('TEST - ONLY')
// })

test.skip('TEST - SKIP', async () => {
  console.log('TEST - SKIP');
})

test('TEST - SKIP BROWSER', async({browserName}) => {
  test.skip(browserName === 'chromium', 'Skipping tests on chromium browser...');

  console.log(`TEST - SKIP BROWSER. Running on: ${browserName}`);
});

test.describe('TEST - DESCRIBE', async () => {
  test('TEST - DESCRIBE - 1', async () => {
    console.log('TEST - DESCRIBE - 1');
  })

  test('TEST - DESCRIBE - 2', async () => {
    console.log('TEST - DESCRIBE - 2');
  })
})

test.describe('TEST - DESCRIBE SKIP', async () => {
  test.skip(({browserName}) => browserName === 'chromium', 'Skipping tests on chromium browser...');

  test('TEST - DESCRIBE SKIP - 1', async () => {
    console.log('TEST - DESCRIBE SKIP - 1');
  })

  test('TEST - DESCRIBE SKIP - 2', async () => {
    console.log('TEST - DESCRIBE SKIP - 2');
  })
})

test('@smoke TEST - TAG', async () => {
  console.log('@smoke TEST - TAG');
})

test('@smoke TEST - TAG - 2', async () => {
  console.log('@smoke TEST - TAG - 2');
})
