import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Silence the context="module" warning
		warningFilter: (warning) => warning.code !== 'script_context_deprecated',
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: { adapter: adapter() },
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md']
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
