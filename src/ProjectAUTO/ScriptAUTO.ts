import { TestScript } from '../../auto/modelFramework/TestScript'
import { BaselineAUTO } from './BaselineAUTO'
import { PageAUTO } from './PageAUTO'
import { DataFlowType } from '../../auto/modelFramework/TestContract'
import { TestFlow } from '../../auto/modelFramework/TestFlow'
import { Page } from 'playwright-core'

export function getClassInstance<T, D>(
  Class: { new (param?: D): T },
  param?: D,
): T {
  if (param) return new Class(param)
  return new Class()
}

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
  constructor(
    readonly model_T: { new (page: Page): T },
    readonly model_D: { new (): D },
  ) {
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
      this.web = new this.model_T(page) // new this.constructor_T(page)
    }
    await this.web.start()
  }

  /**
   * @param data data
   */
  async run(data?: DataFlowType): Promise<void> {
    const flow = new this.model_D()

    const flowMerge = flow.getMerge(data) as D

    await this.web.run(flowMerge)
  }

  /**
   *
   */
  async end(): Promise<void> {
    this.web.close()
  }
}
