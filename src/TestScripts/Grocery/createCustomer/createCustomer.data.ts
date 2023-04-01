import { Page } from '@playwright/test'

import { CreateCustomerTestPage } from './createCustomer.page'
import { DataFlowType } from '../../../../auto/modelFramework/TestContract'
import { TestFlow } from '../../../../auto/modelFramework/TestFlow'
import { ScriptAUTO } from '../../../ProjectAUTO/ScriptAUTO'

/**
 *
 */
export class CreateCustomerTestFlow extends TestFlow {
  customerName = 'New Customer'
  contactLastName = 'Diggs'
  contactFirstName = 'John'
  phone = '+55-11-99118-3456'
  address = 'Diggs'
  addressComplement = 'John'
  city = 'Diadema'
  state = 'São Paulo'
  country = 'Brazil'
  postalCode = '99322-300'
  salesRepresentation = ''
  creditLimit = '99322-300'
  deleted = 0
  action = 'Update'
  success = true

  /**
   * @returns verify is the current value action is 'Create' or not.
   *
   * Take care, because data flow is dynamic and the value will be change for each test case.
   * Take a look at method 'merge' into TestFlow class.
   */
  get isUpdate(): boolean {
    return this.action === 'Update'
  }
}

/**
 *
 */
export class CreateCustomerTestScript extends ScriptAUTO {
  public web: CreateCustomerTestPage

  /**
   *
   */
  constructor() {
    super()

    this.prefix = '#01'
    this.name = 'Create Customer'
    this.tag = 'Customer'

    this.addScenario('Phase input CASE data')
    this.addTestCase('upper name', { customerName: 'name UPPER' })
    // this.addTestCase('lower name', { customerName: 'name lower' })
    // this.addTestCase('mixed name', { customerName: 'name Mixed' })

    // this.addScenario('Phase input VALID data');
    // this.addTestCase('shortlest name', { name: 'Z' });
    // this.addTestCase('with numbers', { name: 'Phase 567' });
    // this.addTestCase('only numbers', { name: '873' });
    // this.addTestCase('with special chars', { name: 'New ##[({!@#$%¨&*})]##' });
    // this.addTestCase('only special chars', { name: '**[({!@#$%¨&*})]**' });

    // this.addScenario('Phase input INVALID data');
    // this.addTestCaseFail('null name', { name: '' });

    // this.addScenario('Phase CANCEL input data');
    // this.addTestCase('press BUTTON', {
    //   name: 'Phase CANCEL button',
    //   action: 'Cancel'
    // });
  }

  /**
   * PageAUTO it is able to control and change page elements in AUTO Desktop
   * if it a first time to create a PageAUTO
   *
   * @param page current page of browser to control automation actions (Playwright library)
   */
  async setup(page: Page): Promise<void> {
    if (this.web) {
      this.web.setPage(page)
    } else {
      this.setBaseline()
      this.web = new CreateCustomerTestPage(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  async run(data?: DataFlowType): Promise<void> {
    const flow = new CreateCustomerTestFlow()

    flow.getMerge(data) as CreateCustomerTestFlow

    await this.web.run(flow)
  }
}
