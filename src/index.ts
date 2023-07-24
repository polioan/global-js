function pollute<T>(key: PropertyKey, value: T) {
  if (typeof window === 'object' && window !== null) {
    try {
      // @ts-expect-error
      window[key] = value
      return
    } catch {}
  }

  if (typeof global === 'object' && global !== null) {
    try {
      // @ts-expect-error
      global[key] = value
      return
    } catch {}
  }

  if (typeof globalThis === 'object' && globalThis !== null) {
    try {
      // @ts-expect-error
      globalThis[key] = value
      return
    } catch {}
  }

  if (typeof self === 'object' && self !== null) {
    try {
      // @ts-expect-error
      self[key] = value
      return
    } catch {}
  }

  try {
    // @ts-expect-error
    if (typeof this === 'object' && this !== null) {
      // @ts-expect-error
      this[key] = value
    }
  } catch {}
}

export { pollute }
