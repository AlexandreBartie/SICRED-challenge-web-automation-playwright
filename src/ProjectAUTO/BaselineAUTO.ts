import { TestBaseline } from '../../auto/runFramework/TestBaseline'

/**
 *
 */
export class BaselineAUTO extends TestBaseline {
  /**
   *
   */
  constructor() {
    super()
    this.folder = 'Hxgn.Mme.Platform.Extension'
    this.pathBaseline = '../../baseline/'
    this.pathLocal =
      process.env.AUTO_LOCALSTORE_DATA_FOLDER ??
      'C:/Hexagon/Mining/LocalStore/Extensions/Data'
  }
}
