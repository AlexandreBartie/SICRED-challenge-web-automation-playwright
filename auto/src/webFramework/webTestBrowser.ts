import { Browser, Page } from '@playwright/test'

/**
 *
 */
export class WebBrowser {
  private browser: Browser

  /**
   * @returns Verify if the browser just be opened
   */
  get isOpened(): boolean {
    return this.browser !== undefined
  }

  /**
   * @param browser Browser (Playwright) used to create new pages
   * @returns Page (Playwright)
   */
  protected async create(browser: Browser): Promise<Page> {
    if (this.isOpened) console.log('browser was recreated!')

    this.browser = browser

    return this.browser.newPage()
  }

  /**
   *
   */
  async close(): Promise<void> {
    this.browser.close()
  }
}
