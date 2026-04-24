import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { url, request } = event;
	const pathname = url.pathname;

	// Handle /patrycja/ redirect to the static index.html
	if (pathname === '/patrycja/') {
		throw redirect(301, '/patrycja/index.html');
	}

	// Browser language detection and redirection for root path
	if (pathname === '/') {
		const referer = request.headers.get('referer');
		const isInternal = referer && new URL(referer).host === url.host;

		if (!isInternal) {
			const acceptLang = request.headers.get('accept-language');
			if (acceptLang) {
				// Parse and sort by quality (q value), descending
				const languages = acceptLang
					.split(',')
					.map((entry) => {
						const [lang, q] = entry.trim().split(';q=');
						return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
					})
					.sort((a, b) => b.q - a.q);

				// Walk in priority order — first supported locale wins
				for (const { lang } of languages) {
					if (lang.startsWith('en')) break; // English → stay on default, stop
					if (lang.startsWith('it')) throw redirect(307, '/it');
					if (lang.startsWith('pl')) throw redirect(307, '/pl');
				}
			}
		}
	}

	// Use the params to determine the language for the HTML tag
	const lang = event.params.lang || 'en';

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
