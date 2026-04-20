<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { base } from '$app/paths';

	let { data } = $props();
	let articles = $derived(data.articles);

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

<svelte:head>
	<title>{i18n.t.articles.title} | Patrycja Wardal</title>
</svelte:head>

<section class="bg-background min-h-screen px-6 py-20 lg:py-32">
	<div class="container mx-auto max-w-6xl">
		<!-- Header -->
		<header class="mb-20 space-y-4">
			<h1 class="font-display text-brand text-4xl leading-tight md:text-6xl">
				{i18n.t.articles.title}
			</h1>
			<p class="text-muted-foreground max-w-2xl text-lg">
				{i18n.t.articles.subtitle}
			</p>
		</header>

		<!-- Grid -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article (article.slug)}
				<a
					href={l(`/articles/${article.slug}`)}
					class="group border-border hover:shadow-brand/5 flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all hover:shadow-xl"
				>
					<!-- Image Container -->
					<div class="relative aspect-video overflow-hidden">
						{#if article.image}
							<img
								src={article.image}
								alt={article.title}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
						{:else}
							<div class="bg-muted h-full w-full transition-colors group-hover:bg-muted/80"></div>
						{/if}
						<div class="absolute top-4 left-4">
							<span
								class="rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase backdrop-blur-sm"
							>
								{article.category}
							</span>
						</div>
					</div>

					<!-- Content -->
					<div class="flex grow flex-col p-8">
						<time class="mb-3 text-[11px] tracking-tighter text-muted-foreground uppercase"
							>{article.date}</time
						>
						<h3 class="group-hover:text-brand mb-4 font-serif text-xl transition-colors">
							{article.title}
						</h3>
						<p class="mb-6 line-clamp-3 grow text-sm leading-relaxed text-muted-foreground">
							{article.description || article.excerpt || ''}
						</p>

						<div class="border-t border-border pt-4">
							<span
								class="group-hover:text-brand inline-flex items-center gap-2 text-xs font-semibold transition-colors text-brand"
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
			{:else}
				<p class="text-muted-foreground italic">No articles found in this language.</p>
			{/each}
		</div>
	</div>
</section>
