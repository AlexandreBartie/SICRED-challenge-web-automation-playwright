import { DataFlowType } from './TestContract'
import { TestScenario } from './TestScenario'

/**
 *
 */
export class TestCase {
  readonly scenario: TestScenario

  readonly name: string
  readonly order: number
  readonly flow: DataFlowType

  /**
   * @returns it informs a order and name of scenario
   */
  get tag(): string {
    return this.scenario.script.tag
  }

  /**
   * @returns it informs a order and name of scenario
   */
  get tagOrder(): string {
    return `${this.order}.`
  }

  /**
   * @returns it informs a order and name of scenario
   */
  get title(): string {
    return `#${this.scenario.tagOrder}${this.tagOrder} ${this.name}`
  }

  /**
   * @param scenario scenario
   * @param name name
   * @param flow flow
   */
  constructor(scenario: TestScenario, name: string, flow: DataFlowType) {
    this.scenario = scenario

    this.name = name
    this.order = this.scenario.tests.length + 1

    this.flow = this.getFlow(flow)
  }

  /**
   * @param flow receive data flow
   * @returns add new attributes in data flow
   */
  private getFlow(flow: DataFlowType): DataFlowType {
    const data = flow

    if (data.name === '<<tag>>') data.name = `New ${this.tag}`

    data.order = this.scenario.tests.length + 1

    return data
  }
}
