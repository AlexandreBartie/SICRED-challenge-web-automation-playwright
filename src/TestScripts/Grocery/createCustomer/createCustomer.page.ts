import { PageAUTO } from '../../../ProjectAUTO/PageAUTO'
import { CreateCustomerTestFlow } from './createCustomer.data'

/**
 *
 */
export abstract class CreateCustomerTestMapping extends PageAUTO {
  readonly customerName = this.setTextBox('field-customerName')
  readonly contactLastName = this.setTextBox('field-contactLastName')
  readonly contactFirstName = this.setTextBox('field-contactFirstName')

  readonly phone = this.setTextBox('field-phone')
  readonly address = this.setTextBox('field-addressLine1')
  readonly addressComplement = this.setTextBox('field-addressLine2')

  readonly city = this.setTextBox('field-city')
  readonly state = this.setTextBox('field-state')
  readonly postalCode = this.setTextBox('field-postalCode')
  readonly country = this.setTextBox('field-country')

  readonly saleRepresentation = this.setTextBox('field-salesRepEmployeeNumber')
  readonly creditLimit = this.setTextBox('field-creditLimit')
  readonly deleted = this.setTextBox('field-deleted')

  readonly buttonAction = this.setButton('form-button-save')
  readonly buttonActionGoBack = this.setButton('save-and-go-back-button')
  readonly buttonCancel = this.setButton('cancel-button')

  readonly message = this.setMessage('report-success')
}

/**
 *
 */
export class CreateCustomerTestPage extends CreateCustomerTestMapping {
  /**
   * @param flow receive the data test
   */
  async run(flow: CreateCustomerTestFlow): Promise<void> {
    await this.addCustomer.click()

    await this.pause()

    await this.buttonAction.assertEnabled(true)
    await this.buttonCancel.assertEnabled(true)

    await this.customerName.assertEmpty()
    await this.contactLastName.assertEmpty()
    await this.contactFirstName.assertEmpty()

    // stepRoutine

    await this.customerName.fill(flow.customerName)
    await this.contactLastName.fill(flow.contactLastName)
    await this.contactFirstName.fill(flow.contactFirstName)

    await this.phone.fill(flow.phone)
    await this.address.fill(flow.address)
    await this.addressComplement.fill(flow.addressComplement)

    await this.city.fill(flow.city)
    await this.state.fill(flow.state)
    await this.postalCode.fill(flow.postalCode)
    await this.country.fill(flow.country)

    await this.saleRepresentation.fill(flow.salesRepresentation)
    await this.creditLimit.fill(flow.creditLimit)
    await this.deleted.fill(flow.deleted)

    await this.pause()

    await this.buttonAction.assertEnabled(true)
    await this.buttonCancel.assertEnabled(true)

    if (flow.isUpdate) await this.buttonAction.click()
    else await this.buttonCancel.click()

    // posRoutine

    await this.pause()

    await this.message.assertHasText(flow.msg)

    await this.pause()

    // await this.buttonUpdate.assertVisible(!flow.success);
    // await this.buttonUpdate.assertVisible(!flow.success);
    // await this.buttonUpdate.assertVisible(!flow.success);

    // if (flow.isCreate)
    //   if (flow.success) {
    //     // await this.tree.assertItem(flow.name);
    //   } else {
    //     await this.buttonCancel.click();
    //   }
  }
}
