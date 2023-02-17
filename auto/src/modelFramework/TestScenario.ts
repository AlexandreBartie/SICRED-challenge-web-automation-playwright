import { DataFlowType } from './TestContract'
import { TestCase } from './TestCase'
import { TestSession } from './TestSession'

/**
 *
 */
export class TestScenario extends TestSession {
  readonly tests: TestCase[] = []

  /**
   * @returns it informs a order prefix
   */
  get tagOrder(): string {
    return `${this.order}.`
  }

  /**
   * @returns it informs a order and name of scenario
   */
  get title(): string {
    return `#${this.tagOrder} ${this.name}`
  }

  /**
   * @param name name
   * @param flow flow
   */
  addTestCase(name: string, flow: DataFlowType): void {
    this.tests.push(new TestCase(this, name, flow))
  }
}
