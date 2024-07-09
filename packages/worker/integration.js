import MagicString from 'magic-string'

/** @returns {import('astro').AstroIntegration} */
export default function AstroIntegration() {
	return {
		name: '@astropub/worker',
		hooks: {
			'astro:config:setup': (api) => {
				api.updateConfig({
					vite: {
						plugins: [
							{
								transform: {
									order: 'post',
									handler(code, id, options) {
										if (hasWorker(code)) {
											const source = new MagicString(code)

											// patch for globalThis.Worker
											if (options?.ssr) {
												source.appendLeft(0, `import "@astropub/worker/polyfill";`)
											}

											// patch for new Worker("../path/to/worker.js")
											for (const match of code.matchAll(workerRE)) {
												const [, type, , href] = match
												const [[lead, tail]] = match.indices

												source.update(lead, tail, getWorkerConstructor(type, href))
											}

											return {
												code: source.toString(),
												map: source.generateMap({
													source: id,
													file: `${id}.map`,
													includeContent: true,
												}),
											}
										}
									}
								}
							}
						]
					}
				})
			},
		}
	}
}

const workerRE = /\bnew\s+(Worker|SharedWorker)\s*\(\s*(["'])((?:(?=(\\?))\4.)*?)\2/dg

const hasWorker = RegExp.prototype.test.bind(/\bnew\s+(?:Worker|SharedWorker)\s*\(/dg)

const getWorkerConstructor = (/** @type {string} */ type, /** @type {string} */ href) => `new ${type}(new URL(${JSON.stringify(href)}, import.meta.url)`
