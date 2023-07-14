// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { cssInjectedByJsPlugin } from "vite-plugin-css-injected-by-js";

export default defineConfig({
	plugins: [cssInjectedByJsPlugin()],
build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
	  output: {
        manualChunks: undefined,
      },
    },
  },
})