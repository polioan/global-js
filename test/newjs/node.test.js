const toImport = '../../dist/index.esm.js'

import(toImport).then(({ pollute }) => {
  pollute('some', 123456)

  // @ts-expect-error
  if (global.some !== 123456) {
    throw new Error('Mismatch!')
  } else {
    // @ts-expect-error
    console.log('Ok', global.some)
  }
})
