import { Page } from '@playwright/test'
import { DataFlowType } from '../../../../src/modelFramework/TestContract'
import {
  CreateDialogTestFlow,
  CreateDialogTestScript
} from '../createDialog.data'
import { CreatePitTestPage } from './createPit.page'

/**
 *
 */
export class CreatePitTestFlow extends CreateDialogTestFlow {
  menu = 'Pit'
  parent = 'site'
}

/**
 *
 */
export class CreatePitTestScript extends CreateDialogTestScript {
  public web: CreatePitTestPage

  readonly prefix = '#01'
  readonly name = 'Create Pit'
  readonly tag = 'Pit'

  /**
   *
   */
  constructor() {
    super()

    this.prefix = '#01'
    this.name = 'Create Pit'
    this.tag = 'Pit'

    this.addScenario('Pit input CASE data')
    this.addTestCase('upper name', { name: 'PIT UPPER' })
    this.addTestCase('lower name', { name: 'pit lower' })
    this.addTestCase('mixed name', { name: 'PIT mixed' })

    this.addScenario('Pit input VALID data')
    this.addTestCase('shortlest name', { name: 'Z' })
    this.addTestCase('with numbers', { name: 'pit 567' })
    this.addTestCase('only numbers', { name: '873' })

    this.addTestCase('with special chars', { name: 'New ##[({!@#$%¨&*})]##' })
    this.addTestCase('only special chars', { name: '**[({!@#$%¨&*})]**' })

    this.addScenario('Pit input INVALID data')
    this.addTestCase('null name', { name: '', success: false })

    this.addScenario('Pit CANCEL input data')
    this.addTestCase('press BUTTON', {
      name: 'PIT CANCEL button',
      action: 'Cancel'
    })
  }

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
      this.web = new CreatePitTestPage(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  async run(data?: DataFlowType): Promise<void> {
    const flow = new CreatePitTestFlow()

    flow.getMerge(data) as CreatePitTestFlow
    await this.web.run(flow)
  }
}
