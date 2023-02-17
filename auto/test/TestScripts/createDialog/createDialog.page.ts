import { PageMMO } from '../../ProjectMMO/PageMMO'
import { CreateDialogTestFlow } from './createDialog.data'

/**
 *
 */
export class CreateDialogTestMapping extends PageMMO {
  readonly name = this.setTextBox('Pit.name')
  readonly buttonCreate = this.setButton('Create')
  readonly buttonCancel = this.setButton('Cancel')
}

/**
 *
 */
export class CreateDialogTestPage extends CreateDialogTestMapping {
  /**
   * @param flow receive the data test
   */
  async run(flow: CreateDialogTestFlow): Promise<void> {
    await this.tree.select(flow.parent)

    await this.pause()

    await this.menu.open(flow.menu)

    await this.pause()

    await this.buttonCreate.assertEnabled(true)
    await this.buttonCancel.assertEnabled(true)

    await this.name.assertEmpty()

    // stepRoutine

    await this.name.fill(flow.name)

    await this.pause()

    await this.buttonCreate.assertEnabled(true)
    await this.buttonCancel.assertEnabled(true)

    if (flow.isCreate) await this.buttonCreate.click()
    else await this.buttonCancel.click()

    // posRoutine

    await this.pause()

    await this.buttonCreate.assertVisible(!flow.success)

    if (flow.isCreate)
      if (flow.success) {
        await this.tree.assertItem(flow.name)
      } else {
        await this.buttonCancel.click()
      }
  }
}
