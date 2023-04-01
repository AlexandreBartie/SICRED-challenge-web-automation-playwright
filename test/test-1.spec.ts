import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto(
    'https://www.grocerycrud.com/v1.x/demo/my_boss_is_in_a_hurry/bootstrap-v5',
  )
  await page
    .locator('#switch-version-select')
    .selectOption('/v1.x/demo/my_boss_is_in_a_hurry/bootstrap-v4')
  await page.locator('#switch-version-select').click()
  await page.getByRole('link', { name: ' Add Record' }).click()
})
