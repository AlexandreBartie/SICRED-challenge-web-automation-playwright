import { Page } from '@playwright/test'
import { TestBaseline } from '../runFramework/TestBaseline'
import { DataFlowType } from './TestContract'
import { TestScenario } from './TestScenario'
import { TestSession } from './TestSession'

/**
 *
 */
export abstract class TestScript {
  public name: string
  public tag: string

  readonly sessions: TestSession[] = []

  readonly scenarios: TestScenario[] = []

  private baseline: TestBaseline

  /**
   * @returns format the feature using name and removing spaces
   */
  get feature(): string {
    return this.name.replace(' ', '')
  }

  /**
   * @returns last TestScenario used only to add new testcases
   */
  private get current(): TestScenario {
    return this.scenarios[this.scenarios.length - 1]
  }

  /**
   * @param baseline TestBaseline Injection Dependecy
   */
  constructor(baseline: TestBaseline) {
    this.baseline = baseline
  }

  /**
   * Copy baseline folder to LocalServices.
   * This operation must be executed a once per Factory and this reason of chech the web object exists or not.
   *
   * @returns if baselines folder was copied to LocalServices or not.
   */
  setBaseline(): boolean {
    return this.baseline.setup(this.feature)
  }

  /**
   * Add default session in current script
   *
   */
  private addDefault(): void {
    this.addSession('Default', {})
  }

  /**
   * Add new session in current script
   *
   * @param name new session title
   * @param flow new session data flow
   */
  addSession(name: string, flow: DataFlowType): void {
    this.sessions.push(
      new TestSession(this, name, flow, this.sessions.length + 1),
    )
  }

  /**
   * Add new scenario in current script
   *
   * @param name new scenario title
   * @param flow new scenario data flow (optional)
   */
  addScenario(name: string, flow: DataFlowType = {}): void {
    if (this.sessions.length === 0) this.addDefault()

    this.scenarios.push(
      new TestScenario(this, name, flow, this.scenarios.length + 1),
    )
  }

  /**
   * Add new test in current scenario
   *
   * @param name test case title
   * @param flow test case data
   */
  addTestCase(name: string, flow: DataFlowType): void {
    this.current.addTestCase(name, flow)
  }

  /**
   * Add new test in current scenario
   *
   * @param name test case title
   * @param flow test case data
   */
  addTestCaseFail(name: string, flow: DataFlowType): void {
    flow.success = false
    this.addTestCase(name, flow)
  }

  /**
   * @returns total test cases of the script
   */
  totalCases(): number {
    const total = this.scenarios.reduce((previous, current) => {
      return previous + current.tests.length
    }, 0)
    return total
  }

  /**
   * @param page page
   */
  abstract setup(page: Page): Promise<void>

  /**
   * @param data data
   */
  abstract run(data?: DataFlowType): Promise<void>

  /**
   *
   */
  abstract end(): Promise<void>
}
