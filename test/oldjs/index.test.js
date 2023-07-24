if (process.version !== 'v0.9.10') {
  throw new Error('Mismatch! Invalid Node Version. Use v0.9.10.')
}

const toRequire = '../../dist/index.cjs.js'

const pollute = require(toRequire).pollute

pollute('some', 123456)

// @ts-expect-error
if (global.some !== 123456) {
  throw new Error('Mismatch!')
} else {
  // @ts-expect-error
  console.log('Ok', global.some)
}
