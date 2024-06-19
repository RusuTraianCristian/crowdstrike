/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		css: false,
		environment: 'jsdom',
		pool: 'vmThreads',
		deps: {
			web: {
				transformCss: true,
			},
			optimizer: {
				web: {
					// node modules that should be included in the bundle
				},
			},
		},
	},
});
