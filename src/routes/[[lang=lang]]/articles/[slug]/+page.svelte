<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { base } from '$app/paths';

	let { data } = $props();
	let Content = $derived(data.content);
	let meta = $derived(data.meta);

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

<svelte:head>
	<title>{meta.title} | Patrycja Wardal</title>
	<meta name="description" content={meta.excerpt || meta.description} />
</svelte:head>

<article class="text-content min-h-screen bg-background px-6 py-20 lg:py-32">
	<div class="mx-auto max-w-3xl">
		<!-- Breadcrumbs & Meta -->
		<div
			class="mb-8 flex items-center gap-4 text-xs font-medium tracking-widest text-muted-foreground uppercase"
		>
			<a href={l('/')} class="transition-colors hover:text-brand">Home</a>
			<span>/</span>
			<a href={l('/articles')} class="transition-colors hover:text-brand">Articles</a>
			<span>/</span>
			<span class="text-brand">{meta.category}</span>
		</div>

		<!-- Header -->
		<header class="mb-12 space-y-6">
			<h1 class="font-display text-4xl leading-tight text-brand md:text-6xl">
				{meta.title}
			</h1>
			<div class="flex items-center gap-4 text-sm text-muted-foreground">
				<time datetime={meta.date}>{meta.date}</time>
				{#if meta.readingTime}
					<span class="h-1 w-1 rounded-full bg-border"></span>
					<span>{meta.readingTime}</span>
				{/if}
			</div>
		</header>

		<!-- Featured Image -->
		{#if meta.image}
			<div class="mb-16 overflow-hidden rounded-3xl shadow-xl">
				<img src={meta.image} alt={meta.title} class="h-auto w-full object-cover" />
			</div>
		{/if}

		<!-- Markdown Content -->
		<div class="prose prose-lg prose-wardal prose-serif max-w-none">
			<!-- Render the mdsvex component -->
			{#if Content}
				<Content />
			{/if}
		</div>

		<!-- Footer / Share -->
		<footer class="mt-20 border-t border-border pt-10">
			<p class="font-serif text-brand italic">
				{i18n.t.articles.read_more}
			</p>
		</footer>
	</div>
</article>
