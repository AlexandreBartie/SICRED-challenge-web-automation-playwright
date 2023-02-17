import { CreateDialogTestPage } from '../createDialog.page'

/**
 *
 */
export class CreatePhaseTestPage extends CreateDialogTestPage {
  readonly name = this.setTextBox('Phase.name')
  readonly buttonCreate = this.setButton('Confirm')
}
