import { DataFlowType } from './TestContract'

/**
 *
 */
export class TestFlow {
  [index: string]: unknown

  name = 'New Item'
  iCounter = 1

  /**
   * @returns string
   */
  getIndexName(): string {
    if (this.name !== '') {
      return `${this.name} #${this.iCounter}`
    }
    return this.name
  }

  /**
   * @param data this data tesy flow will be mixed with default values
   * @returns DataFlowType
   */
  getMerge(data?: DataFlowType): unknown {
    if (data) {
      for (const key in data) this[key] = data[key]
    }
    return this
  }

  /**
   * @returns DataFlowType
   */
  json(): string {
    return JSON.stringify(this)
  }
}
