import { Locator } from '@playwright/test'
import { WebAsserts } from './webTestAsserts'

/**
 *
 */
export class WebElement extends WebAsserts {
  /**
   * @param success success
   */
  async assertOk(success = true): Promise<void> {
    this.expectToBeTruthy(success)
  }

  /**
   * @param visible visible
   */
  async assertVisible(visible: boolean): Promise<void> {
    this.expectToBeTruthy(visible === (await this.element.isVisible()))
  }

  /**
   * @param text text
   */
  async assertText(text: string): Promise<void> {
    this.expectToEqual(text)
  }

  /**
   * @param text text
   */
  async assertHasText(text: string): Promise<void> {
    await this.expectToHaveText(text)
  }

  /**
   * @param text text
   * @param textExpected textExpected
   * @param equal equal
   */
  assertTextToCompare(text: string, textExpected: string, equal = true): void {
    this.expectToCompareText(text, textExpected, equal)
  }

  /**
   * @param key key
   * @param times times
   */
  async press(key: string, times = 1): Promise<void> {
    for (let counter = 1; counter < times; counter++)
      await this.web.page.keyboard.press(key)
  }
}

/**
 *
 */
export class WebClickable extends WebElement {
  /**
   * @param element element
   */
  async click(element?: Locator): Promise<void> {
    const item = this.getElement(element)

    await item.click()

    this.border(item)
  }
}

/**
 *
 */
export class WebValueBox extends WebClickable {
  /**
   *
   */
  async assertEmpty(): Promise<void> {
    this.assertValue('')
  }

  /**
   * @param valueExpected valueExpected
   */
  async assertValue(valueExpected: string): Promise<void> {
    this.expectToCompareText(await this.getValue(), valueExpected)
  }

  /**
   * @returns Get the current value
   */
  private async getValue(): Promise<string> {
    return await this.element.inputValue()
  }
}
/**
 *
 */
export class WebTextBox extends WebValueBox {
  /**
   * @param text fill this text
   */
  async fill(text: string | number): Promise<void> {
    await this.border()

    if (typeof text === 'string') {
      text = text.toString().replace('<<null>>', '')
      text = text.toString().replace('<<chars>>', '[({!@#$%¨&*})]')
    }

    if (text !== null) await this.element.fill(text.toString())
  }
}

/**
 *
 */
export class WebMenu extends WebClickable {
  /**
   * @param name find a item of the menu with this name
   * @returns Locator
   */
  item(name: string): Locator {
    return this.element.getByText(name)
  }

  /**
   * @param name find a menu item with this name
   */
  async open(name: string): Promise<void> {
    await this.click(this.item(name))
  }
}

/**
 *
 */
export class WebNumberBox extends WebTextBox {}

/**
 *
 */
export class WebButton extends WebClickable {
  /**
   * @param enabled check if this button is enabled or not
   */
  async assertEnabled(enabled: boolean): Promise<void> {
    this.assertOk(enabled === (await this.included('enabled')))
  }

  /**
   * @param files simulate upload files associated in the button
   */
  async uploadfiles(files: string | string[]): Promise<void> {
    await this.element.setInputFiles(files)
  }
}
/**
 *
 */
export class WebTreeView extends WebClickable {
  /**
   * @param name find a node of the treeview with this name
   * @returns Locator
   */
  item(name: string): Locator {
    return this.element.getByText(name)
  }

  /**
   * @param title title
   * @returns get the name of node finded
   */
  async name(title: string): Promise<string> {
    return await this.item(title).innerText()
  }

  /**
   * @param title title
   */
  async select(title: string): Promise<void> {
    await this.click(this.item(title))
  }

  /**
   * @param title title
   */
  async assertItem(title: string): Promise<void> {
    this.expectToCompareText(
      title,
      await this.name(title),
      true,
      this.item(title),
    )
  }
}
