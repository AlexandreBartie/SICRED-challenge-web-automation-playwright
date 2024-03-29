import { test } from '@playwright/test'

import { ScopeAUTO } from '../../../src/ProjectAUTO/ScopeAUTO'

const scope = new ScopeAUTO()

test.describe(scope.title, () => {
  for (const script of scope.scripts) {
    test.describe(script.name, () => {
      test.beforeAll(async ({ browser }) => {
        script.setup(await (await browser.newContext()).newPage())
      })
      test.afterAll(async () => {
        await script.end()
      })
      for (const testScenario of script.scenarios) {
        test.describe(testScenario.title, () => {
          for (const testCase of testScenario.tests) {
            test(testCase.title, async () => {
              await script.run(testCase.flow)
            })
          }
        })
      }
    })
  }
})
