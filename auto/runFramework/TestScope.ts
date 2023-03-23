import { TestScript } from '../modelFramework/TestScript'
import { TestLauncher } from './TestLauncher'

/**
 *
 */
export class TestScope {
  readonly launcher: TestLauncher

  readonly title: string

  readonly scripts: TestScript[] = []

  /**
   * @param title Title of the scope of autotest
   */
  constructor(title: string) {
    this.title = title
    this.launcher = new TestLauncher()
  }

  /**
   * @param script Add this script in the scope of autotest
   */
  addNew(script: TestScript): void {
    this.scripts.push(script)
  }

  /**
   * @param script Execute this script in autotest
   */
  async run(script: TestScript): Promise<void> {
    await this.launcher.run(script as TestScript)
  }
}
