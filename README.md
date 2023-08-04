# global-js
[![version](https://img.shields.io/npm/v/@polioan/global-js.svg)](https://www.npmjs.com/package/@polioan/global-js)
[![license](https://img.shields.io/github/license/polioan/global-js)](https://opensource.org/licenses/MIT)

get, set global values in any js env

## Use case

### Test

```ts
import { setGlobal, getEnv } from '@polioan/global-js'

function toTest() {
  return 333
}

if (getEnv('NODE_ENV') === 'test') {
  setGlobal('toTest', toTest)
}
```

### Global cache (useful for hot reload)

```ts
import { getEnv, getGlobal, setGlobal } from '@polioan/global-js'
import { PrismaClient } from '@prisma/client'

export const prisma: PrismaClient = getGlobal('prisma') ?? new PrismaClient({})

if (getEnv('NODE_ENV') !== 'production') {
  setGlobal('prisma', prisma)
}
```

### Libs for browser

```ts
import { setGlobal } from '@polioan/global-js'

class Myjquery {}

setGlobal('$', new Myjquery())
```

### Polyfills

```ts
import { setGlobal } from '@polioan/global-js'

if (typeof structuredClone === 'undefined') {
  setGlobal('structuredClone', value => JSON.parse(JSON.stringify(value)))
}
```

### Creating global libraries

```ts
import { setGlobal } from '@polioan/global-js'

declare global {
  var calculate: (a: number, b: number) => number
}

setGlobal('calculate', (a: number, b: number) => a + b)

const test = calculate(2, 3) // will work
```

## Install

### npm

```shell
npm i @polioan/global-js
```

### yarn

```shell
yarn add @polioan/global-js
```

### CDN

```html
<script src="https://unpkg.com/@polioan/global-js@2.0.0/dist/index.global.js"></script>
<script>
  setGlobal('some', 'test')
</script>
```

### Deno

```ts
import { setGlobal } from 'https://deno.land/x/global_js@2.0.0/src/index.ts'
setGlobal('some', 'test')
```
