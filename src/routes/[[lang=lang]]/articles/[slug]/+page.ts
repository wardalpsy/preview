import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const lang = params.lang || 'en';
	const slug = params.slug;

	// Use import.meta.glob for dynamic markdown imports
	// This is the "SvelteKit way" to handle content files
	const posts = import.meta.glob('/src/lib/articles/**/*.md');

	// Construct the path to find
	const path = `/src/lib/articles/${lang}/${slug}.md`;

	if (!posts[path]) {
		// Try fallback to 'en' if requested language is not found
		const fallbackPath = `/src/lib/articles/en/${slug}.md`;
		if (posts[fallbackPath]) {
			const post = (await posts[fallbackPath]()) as any;
			return {
				content: post.default,
				meta: post.metadata
			};
		}
		throw error(404, `Article not found: ${slug}`);
	}

	try {
		const post = (await posts[path]()) as any;

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		console.error('Error loading article:', e);
		throw error(404, `Error loading article: ${slug}`);
	}
};
