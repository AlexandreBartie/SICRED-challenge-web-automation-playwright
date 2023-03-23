import { Page } from '@playwright/test'
import { DataFlowType } from '../../../../src/modelFramework/TestContract'
import {
  CreateDialogTestFlow,
  CreateDialogTestScript
} from '../createDialog.data'
import { CreatePhaseTestPage } from './createPhase.page'

/**
 *
 */
export class CreatePhaseTestFlow extends CreateDialogTestFlow {
  menu = 'Phase'
  parent = 'PIT #2'
}

/**
 *
 */
export class CreatePhaseTestScript extends CreateDialogTestScript {
  public web: CreatePhaseTestPage

  /**
   *
   */
  constructor() {
    super()

    this.prefix = '#02'
    this.name = 'Create Phase'
    this.tag = 'Phase'

    this.addScenario('Phase input CASE data')
    this.addTestCase('upper name', { name: 'Phase UPPER' })
    this.addTestCase('lower name', { name: 'Phase lower' })
    this.addTestCase('mixed name', { name: 'Phase Mixed' })

    this.addScenario('Phase input VALID data')
    this.addTestCase('shortlest name', { name: 'Z' })
    this.addTestCase('with numbers', { name: 'Phase 567' })
    this.addTestCase('only numbers', { name: '873' })
    this.addTestCase('with special chars', { name: 'New ##[({!@#$%¨&*})]##' })
    this.addTestCase('only special chars', { name: '**[({!@#$%¨&*})]**' })

    this.addScenario('Phase input INVALID data')
    this.addTestCaseFail('null name', { name: '' })

    this.addScenario('Phase CANCEL input data')
    this.addTestCase('press BUTTON', {
      name: 'Phase CANCEL button',
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
      this.web = new CreatePhaseTestPage(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  async run(data?: DataFlowType): Promise<void> {
    const flow = new CreatePhaseTestFlow()

    flow.getMerge(data) as CreatePhaseTestFlow

    await this.web.run(flow)
  }
}
