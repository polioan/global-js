import puppeteer from 'puppeteer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'

async function getScript() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  return await fs.readFile(
    path.join(__dirname, '..', '..', 'dist', 'index.global.js'),
    'utf8'
  )
}

async function run() {
  const script = await getScript()

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.evaluate(script)

  await page.evaluate('pollute("some", 123456)')
  const value1 = await page.evaluate('window["some"]')
  if (value1 !== 123456) {
    await browser.close()
    throw new Error('Mismatch!')
  } else {
    console.log('Ok', value1)
  }

  await browser.close()
}

run()
