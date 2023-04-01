import { WebPage } from '../../auto/webFramework/webTestPage'

/**
 *
 */
export class PageAUTO extends WebPage {
  readonly theme = this.setComboBox('switch-version-select')
  readonly addCustomer = this.setLink(' Add Record')

  private url =
    'https://www.grocerycrud.com/v1.x/demo/my_boss_is_in_a_hurry/bootstrap-v5'

  /**
   * @param width width
   * @param height height
   */
  async start(width = 1200, height = 900): Promise<void> {
    await this.setViewport(width, height)

    await this.go(this.url)
  }
}
