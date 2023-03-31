import { Page, Locator, expect } from '@playwright/test'

import {
  WebButton,
  WebMenu,
  WebNumberBox,
  WebTextBox,
  WebTreeView,
} from './webTestElements'

export enum findElementBy {
  findByID = 'id',
  findByTitle = 'title',
}

/**
 *
 */
class WebPageBase {
  public page: Page

  get hasPage(): boolean {
    return this.page !== undefined
  }

  get getURL(): string {
    if (this.hasPage) return this.page.url()
    return ''
  }

  get isBlanK(): boolean {
    return this.hasPage && this.getURL === 'about:blank'
  }

  get isOpen(): boolean {
    return this.hasPage && !this.page.isClosed()
  }

  constructor(page: Page) {
    this.page = page
  }

  /**
   * This function is used to verify the first execution
   * and start URL browser to start tests
   *
   * @param page page
   */
  setPage(page: Page): void {
    this.page = page
  }

  /**
   * @param seconds number of the seconds the test process still in pause
   * @returns void
   */
  async pause(seconds = 1): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }

  /**
   * @param url open URL in the current browser
   */
  async go(url: string) {
    this.page.goto(url)
    await this.page.bringToFront()
  }

  async title(): Promise<string> {
    return await this.page.title()
  }

  /**
   *
   */
  async refresh() {
    await this.page.reload()
  }

  /**
   * @param width width of the page
   * @param height height of the page
   */
  async setViewport(width = 1920, height = 1080) {
    await this.page.setViewportSize({ width, height })
  }

  /**
   * @param text simulate KeyPress action
   */
  keyPress(text: string) {
    this.page.keyboard.insertText(text)
  }

  /**
   * @param success success
   */
  assert(success: boolean) {
    expect(success).toBeTruthy()
  }

  /**
   * @param msg msg
   */
  fail(msg?: string) {
    if (msg) console.log(`Fail: ${msg}`)

    expect(false).toBeTruthy()
  }

  /**
   *
   */
  async close() {
    await this.page.close()
  }
}

/**
 *
 */
class WebPageFind extends WebPageBase {
  /**
   * @param autoID find by data-testid of element
   * @returns Locator (Playwright)
   */
  findByID(id: string): Locator {
    return this.page.getByTestId(id)
  }

  /**
   * @param title find by title of element
   * @returns Locator (Playwright)
   */
  findByTitle(title: string): Locator {
    return this.page.getByTitle(title)
  }
}

/**
 *
 */
export class WebPage extends WebPageFind {
  /**
   * @param autoID Relative of data-testid
   * @returns WebTextBox
   */
  setTextBox(autoID: string): WebTextBox {
    return new WebTextBox(this, this.findByID(autoID).getByRole('textbox'))
  }

  /**
   * @param autoID Relative of data-testid
   * @returns WebNumberBox
   */
  setNumberBox(autoID: string): WebNumberBox {
    return new WebNumberBox(this, this.findByID(autoID).getByRole('textbox'))
  }

  /**
   * @param autoID Relative of data-testid
   * @returns WebTextBox
   */
  setComboBox(autoID: string): WebTextBox {
    return new WebTextBox(this, this.findByID(autoID).getByRole('combobox'))
  }

  /**
   * @param title Find a button with this title
   * @param autoID Relative of data-testid
   * @returns WebNumberBox
   */
  setButton(title: string, autoID = 'genericFooterForm'): WebButton {
    return new WebButton(this, this.findByID(autoID).getByTitle(title).first())
  }

  /**
   * @param autoID Relative of data-testid
   * @returns WebNumberBox
   */
  setMenu(autoID: string): WebMenu {
    return new WebMenu(this, this.findByID(autoID))
  }

  /**
   * @param autoID Relative of data-testid
   * @returns WebTreeView
   */
  setTreeView(autoID: string): WebTreeView {
    return new WebTreeView(this, this.findByID(autoID))
  }
}
