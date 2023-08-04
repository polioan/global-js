import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rimrafSync } from 'rimraf'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distFolder = path.join(__dirname, '..', 'dist')

function clearDist() {
  if (!rimrafSync(distFolder)) {
    throw new Error('cant rimraf dist')
  }
}

function buildESM() {
  execSync('npx tsc -p tsconfig.build.json -m esnext')
  fs.renameSync(
    path.join(distFolder, 'index.js'),
    path.join(distFolder, 'index.esm.js')
  )
}

function buildCJS() {
  execSync('npx tsc -p tsconfig.build.json -m commonjs -d false')
  fs.renameSync(
    path.join(distFolder, 'index.js'),
    path.join(distFolder, 'index.cjs.js')
  )
}

function buildGlobal() {
  const content = fs.readFileSync(path.join(distFolder, 'index.esm.js'), 'utf8')
  fs.writeFileSync(
    path.join(distFolder, 'index.global.js'),
    `${content.split('\n').slice(0, -2).join('\n')}\n`,
    'utf8'
  )
}

clearDist()
buildESM()
buildCJS()
buildGlobal()
