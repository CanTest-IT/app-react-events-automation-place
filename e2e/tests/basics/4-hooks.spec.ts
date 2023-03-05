import { test } from '@playwright/test';

test.beforeAll(async () => {
  // 1.
  console.log('BEFORE ALL HOOK');
})

test.beforeEach(async () => {
  // 2.
  // 5.
  console.log('BEFORE EACH HOOK');
})

test.afterAll(async () => {
  // 8.
  console.log('AFTER ALL HOOK');
})

test.afterEach(async () => {
  // 4.
  // 7.
  console.log('AFTER EACH HOOK');
})

test('TEST - 1', async ({page}) => {
  // 3.
  console.log('TEST - 1');
});

test('TEST - 2', async ({page}) => {
  // 6.
  console.log('TEST - 2');
});
