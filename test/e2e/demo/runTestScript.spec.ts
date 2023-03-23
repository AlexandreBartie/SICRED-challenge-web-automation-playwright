import { test } from '@playwright/test'
import { TestLauncher } from '../../src/runFramework/TestLauncher'
import { CreateBenchTestScript } from '../../test/TestScripts/createDialog/createBench/createBench.data'
// import { CreateBenchTestScript } from '../../test/TestScripts/createDialog/createBench/createBench.data'
// import { CreateDialogTestScript } from '../../test/TestScripts/createDialog/createDialog.data'
// import { CreateBlastTestScript } from '../../test/TestScripts/createDialog/createBlast/createBlast.data'

const laucher = new TestLauncher()

const script = new CreateBenchTestScript()

// const script = new CreateBlastTestScript()

// const script = new CreateBenchTestScript()

// const script = new CreateDialogTestScript()

test.describe('Start Here ...', () => {
  laucher.run(script)
})
