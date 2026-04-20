import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Handle /patrycja/ redirect to the static index.html
	if (event.url.pathname === '/patrycja/') {
		throw redirect(301, '/patrycja/index.html');
	}

	// Use the params to determine the language for the HTML tag
	const lang = event.params.lang || 'en';

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
