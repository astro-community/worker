export const useWorker = () => {
	const worker = new Worker('./worker.ts', { type: 'module' })

	worker.addEventListener('message', (event) => {
		console.log('worker said:', event.data)
	})

	worker.postMessage('Hello')
}
