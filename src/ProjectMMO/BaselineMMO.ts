import { TestBaseline } from '../../src/runFramework/TestBaseline'

/**
 *
 */
export class BaselineMMO extends TestBaseline {
  /**
   *
   */
  constructor() {
    super()
    this.folder = 'Hxgn.Mme.Platform.Extension'
    this.pathBaseline = '../../baseline/'
    this.pathLocal =
      process.env.MMO_LOCALSTORE_DATA_FOLDER ??
      'C:/Hexagon/Mining/LocalStore/Extensions/Data'
  }
}
