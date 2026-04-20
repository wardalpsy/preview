import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const lang = params.lang || 'en';

	// Use import.meta.glob for dynamic markdown imports
	const files = import.meta.glob('/src/lib/about/**/*.md');

	// Construct the path to find
	const path = `/src/lib/about/${lang}/about.md`;

	if (!files[path]) {
		// Try fallback to 'en' if requested language is not found
		const fallbackPath = `/src/lib/about/en/about.md`;
		if (files[fallbackPath]) {
			try {
				const post = (await files[fallbackPath]()) as any;
				return {
					content: post.default,
					meta: post.metadata
				};
			} catch (e) {
				console.error('Error loading fallback about page:', e);
			}
		}
		throw error(404, `About page not found for language: ${lang}`);
	}

	try {
		const post = (await files[path]()) as any;

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		console.error('Error loading about page:', e);
		throw error(404, `Error loading about page for language: ${lang}`);
	}
};
