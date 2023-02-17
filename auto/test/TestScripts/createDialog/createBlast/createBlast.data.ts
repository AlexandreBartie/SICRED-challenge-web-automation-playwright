import { Page } from '@playwright/test'
import { DataFlowType } from '../../../../src/modelFramework/TestContract'
import {
  CreateDialogTestFlow,
  CreateDialogTestScript
} from '../createDialog.data'

import { CreateBlastTestPage } from './createBlast.page'

/**
 *
 */
export class CreateBlastTestFlow extends CreateDialogTestFlow {
  menu = 'Blast'
  parent = 'BENCH'
}

/**
 *
 */
export class CreateBlastTestScript extends CreateDialogTestScript {
  public web: CreateBlastTestPage

  /**
   *
   */
  constructor() {
    super()

    this.prefix = '#05'
    this.name = 'Create Blast'
    this.tag = 'Blast'

    this.addScenario('Blast input CASE data')
    this.addTestCase('upper name', { name: 'BLAST UPPER' })
    this.addTestCase('lower name', { name: 'blast lower' })
    this.addTestCase('mixed name', { name: 'BLAST mixed' })

    this.addScenario('Blast input VALID data')
    this.addTestCase('shortlest name', { name: 'Z' })
    this.addTestCase('with numbers', { name: 'blast 567' })
    this.addTestCase('only numbers', { name: '873' })

    this.addTestCase('with special chars', {
      name: 'New ##[({!@#$%¨&*})]##'
    })
    this.addTestCase('only special chars', { name: '**[({!@#$%¨&*})]**' })

    this.addScenario('Blast input INVALID data')
    this.addTestCase('null name', { name: '', success: false })

    this.addScenario('Blast CANCEL input data')
    this.addTestCase('press BUTTON', {
      name: 'BLAST CANCEL button',
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
      this.web = new CreateBlastTestPage(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  async run(data?: DataFlowType): Promise<void> {
    const flow = new CreateBlastTestFlow()

    flow.getMerge(data) as CreateBlastTestFlow

    await this.web.run(flow)
  }
}
