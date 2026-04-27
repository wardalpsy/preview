<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { Picture } from '@sveltejs/enhanced-img';
	import { base } from '$app/paths';

	import SEO from '$lib/components/Seo.svelte';

	let { data } = $props();
	let Content = $derived(data.content);
	let meta = $derived(data.meta);

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
	// Dynamically import all images in the assets directory with the enhanced query
	const images = import.meta.glob<Picture>(
		'$lib/assets/images/about/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			query: { enhanced: true },
			import: 'default',
			eager: true
		}
	);
	// Robust lookup: find the image that matches the filename from the JSON
	const getAboutImage = () => {
		const targetPath = meta.image || '';
		// Get just the filename ("about-wardal.jpg")
		const filename = targetPath.split('/').pop();
		const defaultImage = images['/src/lib/assets/images/about-wardal.jpg'];
		if (!filename) return defaultImage;

		// Look through all globbed images for one that ends with this filename
		for (const globPath in images) {
			if (globPath.endsWith(filename)) {
				return images[globPath];
			}
		}

		// Fallback to default if not found
		return defaultImage;
	};
</script>

<SEO title={i18n.t.seo.about.title} metaDesc={i18n.t.seo.about.description} />

<article class="text-content min-h-screen bg-background px-6 py-20 lg:py-32">
	<div class="mx-auto max-w-4xl">
		<!-- Increased slightly for better wrap space -->

		<!-- Breadcrumbs & Meta -->
		<div
			class="mb-8 flex items-center gap-4 text-xs font-medium tracking-widest text-muted-foreground uppercase"
		>
			<a href={l('/')} class="transition-colors hover:text-brand">{i18n.t.a11y.home}</a>
			<span>/</span>
			<span class="text-brand">{meta.title}</span>
		</div>

		<!-- Header -->
		<header class="mt-36 mb-12 space-y-6">
			<h1 class="font-display text-4xl leading-tight text-brand md:text-6xl">
				{meta.title}
			</h1>
		</header>

		<div class="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
			<!-- Featured Image -->
			{#if getAboutImage()}
				<div
					class="w-full shrink-0 overflow-hidden rounded-[8rem] border-12 border-border/50 shadow-2xl shadow-brand/15 md:w-1/2 lg:w-[45%]"
				>
					<enhanced:img
						src={getAboutImage()}
						alt={meta.image_alt || meta.title}
						class="aspect-4/5 h-auto w-full object-cover"
						loading="eager"
						fetchpriority="high"
					/>
				</div>
			{/if}

			<!-- Quote Container -->
			<div class="flex-1">
				<q
					class="block text-center font-display text-2xl leading-tight font-light italic sm:text-3xl md:text-4xl"
				>
					{meta.quote}
				</q>
			</div>
		</div>

		<!-- Body Content -->
		<div class="text-content mx-auto my-24 max-w-none">
			{#if Content}
				<Content />
			{/if}
		</div>
	</div>
</article>
