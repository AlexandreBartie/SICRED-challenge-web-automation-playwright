import { WebPage } from '../../src/webFramework/webTestPage'

/**
 *
 */
export class PageMMO extends WebPage {
  readonly tree = this.setTreeView('TreeView')
  readonly menu = this.setMenu('Menu')

  private url = 'http://localhost:3000'

  /**
   * @param width width
   * @param height height
   */
  async start(width = 1200, height = 900): Promise<void> {
    await this.setViewport(width, height)

    await this.go(this.url)
  }
}
