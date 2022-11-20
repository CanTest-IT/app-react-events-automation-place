import {test} from '@playwright/test';

test.beforeAll(() => {
  console.log('BEFORE ALL\n\n')
})

test.beforeEach(() => {
  console.log('BEFORE EACH');
})

test.afterEach(() => {
  console.log('AFTER EACH\n')
})

test.afterAll(() => {
  console.log('AFTER ALL\n')
})

test('Test - hook 1', async ({page}) => {
  console.log('TEST - 1')
})

test('Test - hook 2', async ({page}) => {
  console.log('TEST - 2')
})

test('Test - hook 3', async ({page}) => {
  console.log('TEST - 3')
})
