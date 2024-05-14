/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ 
		react(), 
		// this is needed to be able to use svg files as react components. ref: https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
		svgr({
			include: '**/*.svg',
			svgrOptions: {
			  exportType: 'default',
			},
		  }), 
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
	},
});
