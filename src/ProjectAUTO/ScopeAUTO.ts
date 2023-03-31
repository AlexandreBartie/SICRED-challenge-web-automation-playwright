import { TestScope } from '../../auto/runFramework/TestScope';
import { CreateBenchTestScript } from '../TestScripts/createDialog/createBench/createBench.data';
import { CreateBlastTestScript } from '../TestScripts/createDialog/createBlast/createBlast.data';
import { CreatePhaseTestScript } from '../TestScripts/createDialog/createPhase/createPhase.data';
import { CreatePitTestScript } from '../TestScripts/createDialog/createPit/createPit.data';

/**
 *
 */
export class ScopeAUTO extends TestScope {
  /**
   *
   */
  constructor() {
    super('E2E: System Autotest Level');

    this.addNew(new CreatePitTestScript());
    this.addNew(new CreatePhaseTestScript());
    this.addNew(new CreateBenchTestScript());
    this.addNew(new CreateBlastTestScript());
  }
}
