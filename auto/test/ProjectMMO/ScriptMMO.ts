import { TestScript } from '../../src/modelFramework/TestScript'
import { BaselineMMO } from './BaselineMMO'
import { PageMMO } from './PageMMO'

/**
 *
 */
export abstract class ScriptMMO extends TestScript {
  public web: PageMMO

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
    super(new BaselineMMO())
  }

  /**
   *
   */
  async end(): Promise<void> {
    this.web.close()
  }
}
