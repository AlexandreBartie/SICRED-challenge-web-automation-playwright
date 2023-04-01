import { TestScript } from '../../auto/modelFramework/TestScript'
import { BaselineAUTO } from './BaselineAUTO'
import { PageAUTO } from './PageAUTO'
import { DataFlowType } from '../../auto/modelFramework/TestContract'
import { TestFlow } from '../../auto/modelFramework/TestFlow'
import { Page } from 'playwright-core'

/**
 *
 */
export abstract class ScriptAUTO<
  T extends PageAUTO,
  D extends TestFlow,
> extends TestScript {
  public web: T

  public prefix: string

  /**
   * @returns format the title using prefix and name
   */
  get title(): string {
    return `${this.prefix}. ${this.name}`
  }

  /**
   *
   */
  constructor() {
    super(new BaselineAUTO())
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
      this.web = <T>new PageAUTO(page) // new this.constructor_T(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  getFlow(data?: DataFlowType): D {
    const flow = <D>new TestFlow() // new this.constructor_D()

    return flow.getMerge(data) as D
  }

  /**
   *
   */
  async end(): Promise<void> {
    this.web.close()
  }
}
