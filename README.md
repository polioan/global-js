# pollute-global
[![version](https://img.shields.io/npm/v/@polioan/pollute-global.svg)](https://www.npmjs.com/package/typescript-notion-formulas)
[![license](https://img.shields.io/github/license/polioan/pollute-global)](https://opensource.org/licenses/MIT)

Make any value global in any JavaScript environment!

## Use case

### Test

```ts
import { pollute } from '@polioan/pollute-global'

function toTest() {
  return 333
}

if (process.env.NODE_ENV === 'test') {
  pollute('toTest', toTest)
}
```

### Global cache (useful for hot reload)

```ts
import { pollute } from '@polioan/pollute-global'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({})

if (process.env.NODE_ENV !== 'production') {
  pollute('prisma', prisma)
}
```

### Libs for browser

```ts
import { pollute } from '@polioan/pollute-global'

class Myjquery {}

pollute('$', new Myjquery())
```

### Polyfills

```ts
import { pollute } from '@polioan/pollute-global'

if (typeof structuredClone === 'undefined') {
  pollute('structuredClone', value => JSON.parse(JSON.stringify(value)))
}
```

### Creating global libraries

```ts
import { pollute } from '@polioan/pollute-global'

declare global {
  var calculate: (a: number, b: number) => number
}

pollute('calculate', (a: number, b: number) => a + b)

const test = calculate(2, 3) // will work
```

## Install

### npm

```shell
npm i @polioan/pollute-global
```

### yarn

```shell
yarn add @polioan/pollute-global
```

### CDN

```html
<script src="https://unpkg.com/@polioan/pollute-global@1.0.0/dist/index.global.js"></script>
<script>
  pollute('some', 'test')
</script>
```

### Deno

```ts
import { pollute } from 'https://deno.land/x/polute_global@1.0.1/src/index.ts'
pollute('some', 'test')
```