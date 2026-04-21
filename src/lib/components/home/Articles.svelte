<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
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
	image: string | undefined
)}
	<a
		href={l(`/articles/${slug}`)}
		class="group flex h-full flex-col overflow-hidden rounded-3xl border bg-secondary text-on-secondary transition-all hover:shadow-xl hover:shadow-brand/15"
	>
		<!-- Image Container -->
		<div class="relative aspect-video overflow-hidden">
			{#if image}
				<img
					src={image}
					alt={title}
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					loading="lazy"
				/>
			{:else}
				<div class="h-full w-full bg-muted transition-colors group-hover:bg-muted/80"></div>
			{/if}
		</div>

		<!-- Content -->
		<div class="flex grow flex-col p-8">
			<time class="mb-3 text-[11px] tracking-tighter text-foreground uppercase">{date}</time>
			<h3 class="mb-4 font-serif text-xl text-brand transition-colors">
				{title}
			</h3>
			<p class="mb-6 grow text-sm leading-relaxed text-foreground">
				{excerpt}
			</p>

			<div class="border-t pt-4">
				<span
					class="inline-flex items-center gap-2 text-xs font-semibold text-brand transition-colors group-hover:text-primary"
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
				{#if i18n.t.articles.subtitle}
					<p class="home-section_subtitle">
						{i18n.t.articles.subtitle}
					</p>
				{/if}
			</div>

			<Button href={l('/articles')} variant="secondary" size="xl">
				{i18n.t.articles.cta}
			</Button>
		</div>

		<!-- Grid -->
		<div class="mt:24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article (article.slug)}
				{@render articleCard(
					article.slug,
					article.title,
					article.description || article.excerpt || '',
					article.date,
					article.image
				)}
			{/each}
		</div>
	</div>
</section>
