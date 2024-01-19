# Astro Worker <img src="https://jonneal.dev/astro-logo.svg" alt="" width="90" height="90" align="right">

**Astro Worker** lets you use Web Workers in Astro,
with server-side workers polyfilled by
[web-worker](https://github.com/developit/web-worker).

[![NPM Version][npm-img]][npm-url]
[![NPM Downloads][download-img]][download-url]
[![Open in StackBlitz][stackblitz-img]][stackblitz-url]

```bash
npm install @astropub/worker
```

## Usage

Import **@astropub/worker** in your Astro configuration.

```ts
import worker from "@astropub/worker"
import { defineConfig } from "astro/config"

export default defineConfig({
  integrations: [
    worker(),
  ],
})
```

### Creating a Worker

Create a worker in any Astro project.

```astro
---
/** @file /src/scripts/worker.ts */

addEventListener("message", (event) => {
  console.log("client said:", event.data)

  postMessage(event.data)
})
```

### Using a Worker

Import the worker into Astro frontmatter.

```astro
---
/** @file /src/pages/index.astro */

const worker = new Worker("../scripts/worker.ts", { type: "module" })

worker.addEventListener("message", (event) => {
  console.log("worker said:", event.data)
})

worker.postMessage("Hello")
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Example</title>
  </head>
  <body>
    <h1>Example</h1>
  </body>
</html>
```

Alternatively, import the worker into a client-side script.

```astro
---
/** @file /src/pages/index.astro */
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Example</title>
  </head>
  <body>
    <h1>Example</h1>
  </body>
</html>
<script>
  const worker = new Worker("../scripts/worker.ts", { type: "module" })

  worker.addEventListener("message", (event) => {
    console.log("worker said:", event.data)
  })

  worker.postMessage("Hello")
</script>
```

## How it works

This integration works by noticing when `Worker` or `SharedWorker` are used in
scripts. If they are, this integration corrects any string references to files.

```js
/* before (does not work in Astro) */
const worker = new Worker('../path/to/worker.js')

/* after (does work in Astro) */
const worker = new Worker(new URL('../path/to/worker.js', import.meta.url))
```

If the integration detects a server-side `Worker` then a polyfill is applied.

```js
---
/* before (does not work in Astro) */
const worker = new Worker('../path/to/worker.js')
---
```

```astro
---
/* after (does work in Astro) */
import "@astropub/worker/polyfill"

const worker = new Worker(new URL('../path/to/worker.js', import.meta.url))
---
```

Enjoy!

---

Code original to this project is licensed under the MIT No Attribution License.

Code from [web-worker](https://github.com/developit/web-worker) is licensed
under the Apache License (Apache-2.0), copyright Jason Miller.

[chat-url]: https://astro.build/chat
[docs-url]: https://github.com/astro-community/worker

[npm-img]: https://img.shields.io/npm/v/@astropub/worker?color=%23444&label=&labelColor=%23CB0000&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjE1MCAxNTAgNDAwIDQwMCIgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTE1MCA1NTBoMjAwVjI1MGgxMDB2MzAwaDEwMFYxNTBIMTUweiIvPjwvc3ZnPg==&style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@astropub/worker
[stackblitz-img]: https://img.shields.io/badge/-Open%20in%20Stackblitz-%231374EF?color=%23444&labelColor=%231374EF&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEwIDggMTIgMTgiIGhlaWdodD0iMTgiIGZpbGw9IiNGRkYiPjxwYXRoIGQ9Ik0xMCAxNy42aDUuMmwtMyA3LjRMMjIgMTQuNGgtNS4ybDMtNy40TDEwIDE3LjZaIi8+PC9zdmc+&style=for-the-badge
[stackblitz-url]: https://stackblitz.com/github/astro-community/worker/tree/main/demo?file=README.md
[bundlejs-img]: https://img.shields.io/bundlejs/size/@astropub%2Fworker?style=for-the-badge
[bundlejs-url]: https://bundlejs.com/?bundle&q=@astropub/worker
[download-url]: https://www.npmjs.com/package/@astropub/worker
[download-img]: https://img.shields.io/badge/dynamic/json?url=https://api.npmjs.org/downloads/point/last-week/@astropub/worker&query=downloads&label=⇓+week&color=%23444&labelColor=%23EEd100&style=for-the-badge
