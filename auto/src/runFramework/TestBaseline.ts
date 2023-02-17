import * as fs from 'fs'
import * as path from 'path'

/**
 *
 */
export class TestBaseline {
  folder: string
  pathBaseline: string
  pathLocal: string

  /**
   * @param feature represents a folder name of the baseline test
   * @returns finished or not
   */
  setup(feature: string): boolean {
    const pathSource = path.join(
      __dirname,
      this.pathBaseline,
      feature,
      this.folder
    )
    const pathDestiny = path.join(this.pathLocal, this.folder)

    console.log(pathSource)
    console.log(pathDestiny)

    // check if the source folder exists
    if (!fs.existsSync(pathSource)) {
      console.error(`Source folder does not exist. - path: ${pathSource}`)
      return false
    }

    // Delete destination folder if it already exists
    if (fs.existsSync(pathDestiny)) {
      fs.rmdirSync(pathDestiny, { recursive: true })
    }

    // Create destination folder
    fs.mkdirSync(pathDestiny)

    this.copyFiles(pathSource, pathDestiny)

    console.log(`Baseline completed! -feature: ${feature}`)

    return true
  }

  /**
   * @param src source folder files
   * @param dest destiny folder files
   */
  private async copyFiles(src: string, dest: string) {
    const files = fs.readdirSync(src)
    for (const file of files) {
      const srcPath = path.join(src, file)
      const destPath = path.join(dest, file)
      if (fs.lstatSync(srcPath).isDirectory()) {
        fs.mkdirSync(destPath)
        this.copyFiles(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}
