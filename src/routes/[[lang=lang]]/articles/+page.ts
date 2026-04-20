import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang || 'en';

	// Get all Markdown files from the articles library
	const glob = import.meta.glob('/src/lib/articles/**/*.md', { eager: true });

	// Filter & Extraction: Get all articles for the current language
	const articles = Object.entries(glob)
		.filter(([path]) => path.includes(`/src/lib/articles/${lang}/`))
		.map(([path, post]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '');
			
			return {
				slug,
				...post.metadata
			};
		})
		// Sort by date (descending)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		articles
	};
};
