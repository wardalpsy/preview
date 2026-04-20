import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
	const lang = params.lang || 'en';

	// Get all Markdown files from the articles library
	const glob = import.meta.glob('/src/lib/articles/**/*.md', { eager: true });

	// 2. Filter & Extraction: Get articles for the current language
	const articles = Object.entries(glob)
		.filter(([path]) => path.includes(`/src/lib/articles/${lang}/`))
		.map(([path, post]: [string, any]) => {
			// Extract slug from filename (e.g., /src/lib/articles/en/my-post.md -> my-post)
			const slug = path.split('/').pop()?.replace('.md', '');

			return {
				slug,
				...post.metadata
			};
		})
		// Sort by date (descending)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		// 4. Take the latest 3 for the homepage
		.slice(0, 3);

	// Load About metadata and content for the homepage
	const aboutFiles = import.meta.glob('/src/lib/about/**/*.md', { eager: true });
	const aboutPath = `/src/lib/about/${lang}/about.md`;
	
	let aboutData = aboutFiles[aboutPath] ? (aboutFiles[aboutPath] as any).metadata : null;
	const aboutContent = aboutFiles[aboutPath] ? (aboutFiles[aboutPath] as any).default : null;

	return {
		...data,
		articles,
		about: aboutData,
		aboutContent
	};
};
