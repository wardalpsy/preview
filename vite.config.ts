import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import Icons from 'unplugin-icons/vite';
import { cmsIconsPlugin } from './vite-plugin-cms-icons';
export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit(),
		cmsIconsPlugin(),
		Icons({
			compiler: 'svelte',
			autoInstall: false
		})
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules/@sveltia/cms')) {
						return 'cms';
					}
				}
			}
		}
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts'
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
