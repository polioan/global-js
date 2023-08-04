/* eslint-disable @typescript-eslint/no-unnecessary-condition */

declare const Deno: unknown

function getGlobal<K extends PropertyKey>(key: K): unknown {
  if (typeof window === 'object' && window != null) {
    try {
      // @ts-expect-error
      return window[key]
    } catch {}
  }

  if (typeof global === 'object' && global != null) {
    try {
      // @ts-expect-error
      return global[key]
    } catch {}
  }

  if (typeof globalThis === 'object' && globalThis != null) {
    try {
      // @ts-expect-error
      return globalThis[key]
    } catch {}
  }

  if (typeof self === 'object' && self != null) {
    try {
      // @ts-expect-error
      return self[key]
    } catch {}
  }

  try {
    // @ts-expect-error
    if (typeof this === 'object' && this != null) {
      // @ts-expect-error
      return this[key]
    }
  } catch {}

  return void 0
}

function setGlobal<K extends PropertyKey, T>(key: K, value: T) {
  if (typeof window === 'object' && window != null) {
    try {
      // @ts-expect-error
      window[key] = value
      return
    } catch {}
  }

  if (typeof global === 'object' && global != null) {
    try {
      // @ts-expect-error
      global[key] = value
      return
    } catch {}
  }

  if (typeof globalThis === 'object' && globalThis != null) {
    try {
      // @ts-expect-error
      globalThis[key] = value
      return
    } catch {}
  }

  if (typeof self === 'object' && self != null) {
    try {
      // @ts-expect-error
      self[key] = value
      return
    } catch {}
  }

  try {
    // @ts-expect-error
    if (typeof this === 'object' && this != null) {
      // @ts-expect-error
      this[key] = value
    }
  } catch {}
}

function preventInvalidEnvValues(payload: unknown) {
  if (typeof payload === 'string') {
    return payload
  }
  return void 0
}

function getEnv<K extends string>(key: K) {
  try {
    if (
      typeof process === 'object' &&
      process != null &&
      'env' in process &&
      typeof process.env === 'object' &&
      process.env != null
    ) {
      return preventInvalidEnvValues(process.env[key])
    }

    if (
      typeof Deno === 'object' &&
      Deno != null &&
      'env' in Deno &&
      typeof Deno.env === 'object' &&
      Deno.env != null &&
      'get' in Deno.env &&
      typeof Deno.env.get === 'function'
    ) {
      return preventInvalidEnvValues(Deno.env.get(key))
    }

    const shell = new ActiveXObject('WScript.Shell')
    const env = shell.Environment('Process').Item(key)
    return preventInvalidEnvValues(env)
  } catch {}

  return void 0
}

export { getGlobal, setGlobal, getEnv }
