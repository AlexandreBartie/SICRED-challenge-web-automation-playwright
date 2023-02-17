import { CreateDialogTestPage } from '../createDialog.page'

/**
 *
 */
export class CreatePitTestPage extends CreateDialogTestPage {
  readonly name = this.setTextBox('Pit.name')
}
