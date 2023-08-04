const toImport = '../../dist/index.esm.js'

void import(toImport).then(({ getGlobal, setGlobal }) => {
  const setTimeout = getGlobal('setTimeout')
  if (setTimeout.name !== 'setTimeout') {
    throw new Error('Mismatch!')
  }

  Object.defineProperty(window, 'err', {
    get() {
      throw new Error('get err')
    },
  })

  if (getGlobal('err') !== undefined) {
    throw new Error('Mismatch!')
  }

  // @ts-expect-error
  window.global = { err: 'text' }

  if (getGlobal('err') !== 'text') {
    throw new Error('Mismatch!')
  }

  //

  setGlobal('key', 'value')

  // @ts-expect-error
  if (window.key !== 'value') {
    throw new Error('Mismatch!')
  }
})
