import { CreateCustomerTestPage } from './createCustomer.page'
import { TestFlow } from '../../../../auto/modelFramework/TestFlow'
import { ScriptAUTO } from '../../../ProjectAUTO/ScriptAUTO'

// interface ICreateCustomerTestFlow {
//   customerName: string
//   contactLastName: string
//   contactFirstName: string
//   phone: string
//   address: string
//   addressComplement: string
//   city: string
//   state: string
//   country: string
//   postalCode: string
//   salesRepresentation: string
//   creditLimit: string
//   deleted: number
//   action: string
//   success: boolean
// }

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
  msg = 'Your data has been successfully stored into the database.'

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
export class CreateCustomerTestScript extends ScriptAUTO<
  CreateCustomerTestPage,
  CreateCustomerTestFlow
> {
  /**
   *
   */
  constructor() {
    super(CreateCustomerTestPage, CreateCustomerTestFlow)

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
}
