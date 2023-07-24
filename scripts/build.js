import { rimraf } from 'rimraf'
import { format as prettier } from 'prettier'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const distFolder = path.join(__dirname, '..', 'dist')

async function clearDist() {
  if (!(await rimraf(distFolder))) {
    throw new Error('cant remove dist')
  }
}

async function buildTypes() {
  execSync('npx tsc -p tsconfig.build-types.json')
}

async function buildESM() {
  execSync('npx tsc -p tsconfig.build.json')
  const filePath = path.join(distFolder, 'index.js')
  const content = await fs.readFile(filePath, 'utf8')
  if (!(await rimraf(filePath))) {
    throw new Error('cant remove index.js')
  }
  const formatted = await prettier(content, { parser: 'babel' })
  await fs.writeFile(path.join(distFolder, 'index.esm.js'), formatted, 'utf8')
  return formatted
}

async function buildGlobal(
  /** @type {Awaited<ReturnType<typeof buildESM>>} */ formattedESM
) {
  const formatted = formattedESM
    .replace('export { pollute };', '')
    .replace('export { pollute }', '')
    .trimEnd()
  await fs.writeFile(
    path.join(distFolder, 'index.global.js'),
    formatted,
    'utf8'
  )
  return formatted
}

async function buildCJS(
  /** @type {Awaited<ReturnType<typeof buildGlobal>>} */ formatted
) {
  await fs.writeFile(
    path.join(distFolder, 'index.cjs.cjs'),
    formatted + '\nmodule.exports = { pollute: pollute };',
    'utf8'
  )
}

/**
 * @param  {...((pipeValue: any) => Promise<any>)} actions
 */
async function run(...actions) {
  let pipeValue
  for (const action of actions) {
    try {
      console.log(
        `✅ ${action.name
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .split(/\s+/)
          .map(word => word.toLowerCase())
          .join(' ')}`
      )
      pipeValue = await action(pipeValue)
    } catch (e) {
      console.error(e)
      if (typeof e === 'object' && e !== null) {
        try {
          // @ts-expect-error
          console.log(e.output?.toString?.())
          // @ts-expect-error
          console.log(e.stdout?.toString?.())
          // @ts-expect-error
          console.log(e.stderr?.toString?.())
        } catch {}
      }
      process.exit(1)
    }
  }
}

run(clearDist, buildTypes, buildESM, buildGlobal, buildCJS)
