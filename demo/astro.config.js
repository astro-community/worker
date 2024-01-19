import worker from '@astropub/worker'
import { defineConfig } from 'astro/config'

export default defineConfig({
	integrations: [
		worker(),
	],
})
