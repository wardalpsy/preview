<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { base } from '$app/paths';

	interface Article {
		slug: string;
		title: string;
		description?: string;
		excerpt?: string;
		date: string;
		category: string;
		image?: string;
	}

	let { articles = [] }: { articles: Article[] } = $props();

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

{#snippet articleCard(
	slug: string,
	title: string,
	excerpt: string,
	date: string,
	category: string,
	image: string | undefined
)}
	<a
		href={l(`/articles/${slug}`)}
		class="group hover:shadow-wardal-brown/5 border-wardal-sand flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all hover:shadow-xl"
	>
		<!-- Image Container -->
		<div class="relative aspect-video overflow-hidden">
			{#if image}
				<img
					src={image}
					alt={title}
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
			{:else}
				<div class="h-full w-full bg-muted transition-colors group-hover:bg-muted/80"></div>
			{/if}
			<div class="absolute top-4 left-4">
				<span
					class="text-wardal-purple rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm"
				>
					{category}
				</span>
			</div>
		</div>

		<!-- Content -->
		<div class="flex grow flex-col p-8">
			<time class="text-wardal-brown/50 mb-3 text-[11px] tracking-tighter uppercase">{date}</time>
			<h3
				class="text-wardal-purple group-hover:text-wardal-green mb-4 font-serif text-xl transition-colors"
			>
				{title}
			</h3>
			<p class="text-wardal-brown/80 mb-6 grow text-sm leading-relaxed">
				{excerpt}
			</p>

			<div class="border-wardal-sand/50 border-t pt-4">
				<span
					class="text-wardal-purple group-hover:text-wardal-green inline-flex items-center gap-2 text-xs font-semibold transition-colors"
				>
					{i18n.t.articles.read_more}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg
					>
				</span>
			</div>
		</div>
	</a>
{/snippet}

<section id="articles" class="scroll-m-10 border-y-2 border-border bg-white py-24">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
			<div class="max-w-xl space-y-4">
				<h2 class="home-section_h2">
					{i18n.t.articles.title}
				</h2>
				<p class="home-section_subtitle">
					{i18n.t.articles.subtitle}
				</p>
			</div>

			<a
				href={l('/articles')}
				class="border-wardal-purple/20 text-wardal-purple hover:bg-wardal-purple rounded-full border px-8 py-4 text-sm font-medium whitespace-nowrap transition-all hover:text-white"
			>
				{i18n.t.articles.cta}
			</a>
		</div>

		<!-- Grid -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article (article.slug)}
				{@render articleCard(
					article.slug,
					article.title,
					article.description || article.excerpt || '',
					article.date,
					article.category,
					article.image
				)}
			{/each}
		</div>
	</div>
</section>
