import { DataFlowType } from './TestContract'
import { TestScript } from './TestScript'

/**
 *
 */
export class TestSession {
  readonly script: TestScript

  readonly name: string
  readonly order: number

  readonly flow?: DataFlowType

  /**
   * @returns a order prefix
   */
  get tagOrder(): string {
    return `[${this.order}]`
  }

  /**
   * @returns a order and name as this example: #1. Special feature
   */
  get title(): string {
    return `${this.tagOrder} ${this.name}`
  }

  /**
   * @param script Dependency Injection
   * @param title title that describes a new session
   * @param flow data flow (optional)
   * @param order position of the list
   */
  constructor(
    script: TestScript,
    title: string,
    flow: DataFlowType,
    order: number
  ) {
    this.script = script
    this.name = title
    this.flow = flow
    this.order = order
  }
}
