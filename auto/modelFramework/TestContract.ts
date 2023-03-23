/**
 *
 */
export type DataFlowType = { [index: string]: string | number | boolean }

/**
 *
 */
export interface ITestCase {
  /**
   *
   */
  name: string
  /**
   *
   */
  data: DataFlowType
}

/**
 *
 */
export interface ITestScenario {
  /**
   *
   */
  suite: ITestSuite
  /**
   *
   */
  title: string
  /**
   *
   */
  tests: ITestCase[]
}

/**
 *
 */
export interface ITestSuite {
  /**
   * title
   */
  title?: string
  /**
   *
   */
  scenarios: ITestScenario[]
}
