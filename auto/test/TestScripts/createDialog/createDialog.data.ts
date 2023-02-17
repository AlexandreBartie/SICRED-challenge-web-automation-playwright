import { Page } from '@playwright/test'
import { DataFlowType } from '../../../src/modelFramework/TestContract'
import { TestFlow } from '../../../src/modelFramework/TestFlow'
import { ScriptMMO } from '../../ProjectMMO/ScriptMMO'
import { CreateDialogTestPage } from './createDialog.page'

/**
 *
 */
export class CreateDialogTestFlow extends TestFlow {
  menu = 'Dialog'
  parent = 'site'
  name = 'New ' + this.menu
  action = 'Create'
  success = true

  /**
   * @returns verify is the current value action is 'Create' or not.
   *
   * Take care, because data flow is dynamic and the value will be change for each test case.
   * Take a look at method 'merge' into TestFlow class.
   */
  get isCreate(): boolean {
    return this.action === 'Create'
  }
}

/**
 *
 */
export class CreateDialogTestScript extends ScriptMMO {
  public web: CreateDialogTestPage

  /**
   * PageMMO it is able to control and change page elements in MMO Desktop
   * if it a first time to create a PageMMO
   *
   * @param page current page of browser to control automation actions (Playwright library)
   */
  async setup(page: Page): Promise<void> {
    if (this.web) {
      this.web.setPage(page)
    } else {
      this.setBaseline()
      this.web = new CreateDialogTestPage(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  async run(data?: DataFlowType): Promise<void> {
    const flow = new CreateDialogTestFlow()

    flow.getMerge(data) as CreateDialogTestFlow

    await this.web.run(flow)
  }
}
