import { TestScope } from '../../auto/runFramework/TestScope'

import { CreateCustomerTestScript } from '../../src/TestScripts/Grocery/createCustomer/createCustomer.data'

/**
 *
 */
export class ScopeAUTO extends TestScope {
  /**
   *
   */
  constructor() {
    super('E2E: System Autotest Level')

    this.addNew(new CreateCustomerTestScript())
  }
}
