addEventListener('message', (event) => {
	console.log('client said:', event.data)

	postMessage(event.data)
})
