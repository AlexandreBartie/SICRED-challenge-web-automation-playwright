import { CreateDialogTestMapping } from '../createDialog.page'
import { CreateBenchTestFlow } from './createBench.data'

class CreateBenchTestMapping extends CreateDialogTestMapping {
  readonly name = this.setTextBox('Bench.name')
  readonly description = this.setTextBox('Bench.description')
  readonly benchTop = this.setNumberBox('Bench.top')
  readonly benchBottom = this.setNumberBox('Bench.bottom')
}

/**
 *
 */
export class CreateBenchTestPage extends CreateBenchTestMapping {
  /**
   * @param flow receive the data test
   */
  async run(flow: CreateBenchTestFlow): Promise<void> {
    // preRoutine

    await this.tree.select(flow.parent)

    await this.pause()

    await this.menu.open(flow.menu)

    await this.pause()

    await this.buttonCreate.assertEnabled(true)
    await this.buttonCancel.assertEnabled(true)

    await this.name.assertEmpty()
    await this.description.assertEmpty()
    await this.benchTop.assertValue('2050')
    await this.benchBottom.assertValue('2025')

    // stepRoutine

    await this.name.fill(flow.name)
    await this.description.fill(flow.description)
    await this.benchTop.fill(flow.benchTop)
    await this.benchBottom.fill(flow.benchBottom)

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
