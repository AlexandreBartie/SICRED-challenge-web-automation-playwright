import { test } from '@playwright/test'
import { TestLauncher } from '../../../auto/runFramework/TestLauncher'

import { CreateCustomerTestScript } from '../../../src/TestScripts/Grocery/createCustomer/createCustomer.data'

const laucher = new TestLauncher()

const script = new CreateCustomerTestScript()

test.describe('Start Here ...', () => {
  laucher.run(script)
})
