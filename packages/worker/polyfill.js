if (!globalThis.Worker || !globalThis.SharedWorker) {
	const { default: Worker } = await import('./implementation.js')

	globalThis.Worker = globalThis.Worker || Worker
	globalThis.SharedWorker = globalThis.SharedWorker || globalThis.Worker
}
