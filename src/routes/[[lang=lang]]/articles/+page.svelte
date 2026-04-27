<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { base } from '$app/paths';

	import SEO from '$lib/components/Seo.svelte';

	let { data } = $props();
	let articles = $derived(data.articles);

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

<SEO title={i18n.t.seo.articles.title} metaDesc={i18n.t.seo.articles.description} />

<section class="min-h-screen bg-background px-6 py-20 lg:py-32">
	<div class="container mx-auto max-w-6xl">
		<!-- Header -->
		<header class="mb-20 space-y-4">
			<h1 class="font-display text-4xl leading-tight text-brand md:text-6xl">
				{i18n.t.articles.title}
			</h1>
			<p class="max-w-2xl text-lg text-muted-foreground">
				{i18n.t.articles.subtitle}
			</p>
		</header>

		<!-- Grid -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article (article.slug)}
				<a
					href={l(`/articles/${article.slug}`)}
					class="group flex h-full flex-col overflow-hidden rounded-3xl border bg-secondary text-on-secondary transition-all hover:shadow-xl hover:shadow-brand/15"
				>
					<!-- Image Container -->
					<div class="relative aspect-video overflow-hidden">
						{#if article.image}
							<img
								src={article.image}
								alt={article.title}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="eager"
							/>
						{:else}
							<div class="h-full w-full bg-muted transition-colors group-hover:bg-muted/80"></div>
						{/if}
					</div>

					<!-- Content -->
					<div class="flex grow flex-col p-8">
						<time class="mb-3 text-[11px] tracking-tighter text-foreground uppercase"
							>{article.date}</time
						>
						<h3 class="mb-4 font-serif text-xl text-brand transition-colors">
							{article.title}
						</h3>
						<p class="mb-6 line-clamp-3 grow text-sm leading-relaxed text-foreground">
							{article.description || article.excerpt || ''}
						</p>

						<div class="border-t border-border pt-4">
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
									><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
										d="M9 6l6 6l-6 6"
									/></svg
								>
							</span>
						</div>
					</div>
				</a>
			{:else}
				<p class="text-foreground/90 italic">No articles found in this language.</p>
			{/each}
		</div>
	</div>
</section>
