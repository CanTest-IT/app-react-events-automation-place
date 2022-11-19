import {test, expect} from '@playwright/test';

test.beforeAll(async ({page}) => {
  console.log('BEFORE ALL')
})

test.beforeEach(async ({page}) => {
  console.log('BEFORE EACH')
})

test.afterAll(async ({page}) => {
  console.log('AFTER ALL')
})

test.afterEach(async ({page}) => {
  console.log('AFTER EACH')
})

test("Test - hooksy - 1", async ({page}) => {
  console.log('INSIDE TEST - 1')
})

test("Test - hooksy - 2", async ({page}) => {
  console.log('INSIDE TEST - 2')
})

test("Test - hooksy - 3", async ({page}) => {
  console.log('INSIDE TEST - 3')
})
