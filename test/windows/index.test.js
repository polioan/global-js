import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rimraf } from 'rimraf'

async function getScript() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  return await fs.readFile(
    path.join(__dirname, '..', '..', 'dist', 'index.global.js'),
    'utf8'
  )
}

async function run() {
  const script = await getScript()

  await fs.writeFile(
    './script.js',
    script + '\n pollute("some", 123456); WScript.Echo(this.some)'
  )

  execSync('wscript script.js')

  console.log(execSync('cscript script.js').toString())

  if (!(await rimraf('./script.js'))) {
    throw new Error('cant remove script.js')
  }
}

run()
