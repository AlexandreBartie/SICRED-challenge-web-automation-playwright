import { ElementHandle, expect, Locator } from '@playwright/test'
import { WebPage } from './webTestPage'

/**
 *
 */
export class WebSelector {
  readonly web: WebPage

  readonly element: Locator

  /**
   * @param web web
   * @param element element
   */
  constructor(web: WebPage, element: Locator) {
    this.web = web

    this.element = element
  }

  /**
   * @param element element
   * @returns if the element is null return the element (this.element)
   */
  getElement(element?: Locator): Locator {
    if (element) return element
    return this.element
  }

  /**
   * @param element element
   * @returns Locator
   */
  async getItemHTML(
    element?: Locator
  ): Promise<null | ElementHandle<SVGElement | HTMLElement>> {
    try {
      return await this.getElement(element).elementHandle()
    } catch {
      return null
    }
  }
}

/**
 *
 */
export class WebAttributes extends WebSelector {
  /**
   * @param name name
   * @returns string
   */
  async attribute(name: string): Promise<string> {
    let ret = await this.element.getAttribute(name)

    if (ret == null) return (ret = '')

    return ret
  }

  /**
   * @returns get the HTMLElement.textContent of the current element
   */
  async textContent(): Promise<string | null> {
    return await this.element.textContent()
  }

  /**
   * @returns get the HTMLElement.class of the current element
   */
  async class(): Promise<string> {
    return await this.attribute('class')
  }

  /**
   * @returns get the HTMLElement.title of the current element
   */
  async title(): Promise<string | null> {
    return await this.attribute('title')
  }

  /**
   * @returns get the HTMLElement.innerText of the current element
   */
  async innerText(): Promise<string | null> {
    return await this.element.innerText()
  }

  /**
   * @param text find this text in HTMLElement.class
   * @returns find or not
   */
  async included(text: string): Promise<boolean> {
    return (await this.class()).includes(text)
  }
}

/**
 *
 */
export class WebArea extends WebAttributes {
  /**
   * @param element element
   */
  async border(element?: Locator): Promise<void> {
    const item = this.getElement(element)
    await this.borderGeneric(false, item)
  }

  /**
   * @param element element
   */
  async borderCheck(element?: Locator): Promise<void> {
    const item = this.getElement(element)
    await this.borderGeneric(true, item)
  }

  /**
   * @param check check
   * @param element element
   */
  private async borderGeneric(check: boolean, element: Locator): Promise<void> {
    const drawLines = true
    const inspectItens = false

    if (drawLines) {
      await this.draw(true, check, element)
      await this.web.pause(1)
      await this.draw(false, check, element)
    }

    if (inspectItens) element.highlight()
  }

  /**
   * @param style style of the border
   * @param check process check
   * @param element element to get border
   */
  private async draw(
    style: boolean,
    check: boolean,
    element: Locator
  ): Promise<void> {
    const item = await this.getItemHTML(element)
    if (item) {
      if (style)
        if (check)
          await this.web.page.evaluate((el) => {
            if (el) el.style.border = '2px Dotted green'
          }, item)
        else
          await this.web.page.evaluate((el) => {
            if (el) el.style.border = '2px solid orange'
          }, item)
      else
        await this.web.page.evaluate((el) => {
          if (el) el.style.border = 'none'
        }, item)
    }
  }
}

/**
 *
 */
export class WebAsserts extends WebArea {
  /**
   * @param value value
   */
  expectToBeTruthy(value: boolean): void {
    this.borderCheck()
    expect(value, 'This condition must be true/false').toBeTruthy()
  }

  /**
   * @param text Text to be compared
   * @param element Element to be compared
   */
  expectToEqual(text: string, element?: Locator): void {
    this.borderCheck(element)
    expect(this.getElement(element), 'Must have the same content').toEqual(text)
  }

  /**
   * @param text Text to be find
   * @param element Element to get text
   */
  async expectToHaveText(text: string, element?: Locator): Promise<void> {
    this.borderCheck(element)
    await expect(
      this.getElement(element),
      'Must have this text inside'
    ).toHaveText(text)
  }

  /**
   * @param text text to be compared
   * @param expected text expected
   * @param equal define if expected result is equal or not
   * @param element define the element to get border
   */
  expectToCompareText(
    text: string,
    expected: string,
    equal = true,
    element?: Locator
  ): void {
    this.borderCheck(element)
    if (equal) expect(expected, 'Must have the same value').toEqual(text)
    else expect(expected, 'Must have a different value').not.toEqual(text)
  }

  /**
   * @param functionName Function name the called logError.
   */
  public logError(functionName: string): void {
    console.log(`Suspicious behavior detected. -assert: ${functionName}`)
  }
}
