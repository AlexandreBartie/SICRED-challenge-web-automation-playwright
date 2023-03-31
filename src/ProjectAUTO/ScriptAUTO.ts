import { TestScript } from '../../auto/modelFramework/TestScript';
import { BaselineAUTO } from './BaselineAUTO';
import { PageAUTO } from './PageAUTO';

/**
 *
 */
export abstract class ScriptAUTO extends TestScript {
  public web: PageAUTO;

  public prefix: string;

  /**
   * @returns format the title using prefix and name
   */
  get title(): string {
    return `${this.prefix}. ${this.name}`;
  }

  /**
   *
   */
  constructor() {
    super(new BaselineAUTO());
  }

  /**
   *
   */
  async end(): Promise<void> {
    this.web.close();
  }
}
