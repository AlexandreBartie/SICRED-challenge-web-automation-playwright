import { test } from '@playwright/test'
import { TestScript } from '../modelFramework/TestScript'

/**
 *
 */
export class TestLauncher {
  /**
   * It is a important piece of the AutoTest Framework
   * It gets the factory and read all scenarios and run all TestCases
   *
   * @param script define the set of the test cases will be executed
   */
  async run(script: TestScript): Promise<void> {
    test.describe(script.name, () => {
      for (const session of script.sessions) {
        test.describe(session.title, () => {
          test.beforeAll(async ({ browser }) => {
            script.setup(await (await browser.newContext()).newPage())
          })
          test.afterAll(async () => {
            await script.end()
          })
          for (const scenario of script.scenarios) {
            test.describe(scenario.title, () => {
              for (const testCase of scenario.tests) {
                test(testCase.title, async () => {
                  await script.run(testCase.flow)
                })
              }
            })
          }
        })
      }
    })
  }
}
