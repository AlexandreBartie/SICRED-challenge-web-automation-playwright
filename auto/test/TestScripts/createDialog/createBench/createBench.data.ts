import { Page } from '@playwright/test'
import { DataFlowType } from '../../../../src/modelFramework/TestContract'
import { CreateBenchTestPage } from './createBench.page'

import {
  CreateDialogTestFlow,
  CreateDialogTestScript
} from '../createDialog.data'

/**
 *
 */
export class CreateBenchTestFlow extends CreateDialogTestFlow {
  menu = 'Bench'
  parent = 'PHASE'
  description = 'Describe about bench here'
  benchTop = 20
  benchBottom = 10
}

/**
 *
 */
export class CreateBenchTestScript extends CreateDialogTestScript {
  public web: CreateBenchTestPage

  /**
   *
   */
  constructor() {
    super()

    this.prefix = '#04'
    this.name = 'Create Bench'
    this.tag = 'Bench'

    // this.addSession('Under Pit', { parent: 'PIT' })
    this.addSession('Under Phase', { parent: 'PHASE' })

    this.addScenario('Bench input CASE data')
    this.addTestCase('upper name', { name: 'Bench UPPER' })
    this.addTestCase('lower name', { name: 'Bench lower' })
    this.addTestCase('mixed name', { name: 'Bench mixed' })

    this.addScenario('Bench input VALID data')
    this.addTestCase('shortlest name', { name: 'Z' })
    this.addTestCase('with numbers', { name: 'Bench 567' })
    this.addTestCase('only numbers', { name: '873' })

    this.addTestCase('with special chars', { name: 'New ##[({!@#$%¨&*})]##' })
    this.addTestCase('only special chars', { name: '**[({!@#$%¨&*})]**' })

    this.addScenario('Bench input INVALID data')
    this.addTestCaseFail('null name', { name: '' })
    this.addTestCase('null description', {
      name: 'null description',
      description: ''
    })
    this.addTestCaseFail('null all', { name: '', description: '' })

    this.addScenario('Bench CANCEL input data')
    this.addTestCase('press BUTTON', {
      name: 'Bench CANCEL button',
      action: 'Cancel'
    })

    this.addScenario('Bench Top and Bottom ZERO values')
    this.addTestCaseFail('Top ZERO value', { name: 'TOP = ZERO', benchTop: 0 })
    this.addTestCase('Bottom ZERO value', {
      name: 'BOTTOM = ZERO',
      benchBottom: 0
    })
    this.addTestCaseFail('Top and Bottom ZERO value', {
      name: 'TOP-BOTTOM = ZERO',
      benchTop: 0,
      benchBottom: 0
    })

    this.addScenario('Bench Top and Bottom INPUT integer values')
    this.addTestCase('Top is bigger than Bottom integer value', {
      name: 'Integer TOP > BOTTOM',
      benchTop: 40,
      benchBottom: 30
    })
    this.addTestCaseFail('Top is smaller than Bottom integer value', {
      name: 'Integer TOP < BOTTOM',
      benchTop: 20,
      benchBottom: 30
    })
    this.addTestCaseFail('Top is equal than Bottom integer value', {
      name: 'Integer TOP = BOTTOM',
      benchTop: 30,
      benchBottom: 30
    })

    this.addScenario('Bench Top and Bottom INPUT decimal values')
    this.addTestCase('Top is bigger than Bottom decimal value', {
      name: 'Decimal TOP > BOTTOM',
      benchTop: 40.2,
      benchBottom: 30.1
    })
    this.addTestCaseFail('Top is smaller than Bottom decimal value', {
      name: 'Decimal TOP < BOTTOM',
      benchTop: 20.9,
      benchBottom: 30.9
    })
    this.addTestCaseFail('Top is equal than Bottom decimal value', {
      name: 'Decimal TOP = BOTTOM',
      benchTop: 30.1,
      benchBottom: 30.1
    })

    this.addScenario('Bench Top and Bottom INPUT boundary values')
    this.addTestCase('Top is minimum bigger than Bottom', {
      name: 'Boundary TOP > BOTTOM',
      benchTop: 30.01,
      benchBottom: 30
    })
    this.addTestCaseFail('Top is minimum smaller than Bottom', {
      name: 'Boundary TOP < BOTTOM',
      benchTop: 29.99,
      benchBottom: 30
    })
    this.addTestCaseFail('Top is equal than Bottom', {
      name: 'Boundary TOP = BOTTOM',
      benchTop: 30.0,
      benchBottom: 30
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
      this.web = new CreateBenchTestPage(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  async run(data?: DataFlowType): Promise<void> {
    const flow = new CreateBenchTestFlow()

    flow.getMerge(data) as CreateBenchTestFlow

    await this.web.run(flow)
  }
}
