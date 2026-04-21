<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { Picture } from '@sveltejs/enhanced-img';
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';

	// Dynamically import all images in the assets directory with the enhanced query
	const images = import.meta.glob<Picture>(
		'$lib/assets/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			query: { enhanced: true },
			import: 'default',
			eager: true
		}
	);

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};

	// Robust lookup: find the image that matches the filename from the JSON
	const getHeroImage = () => {
		const targetPath = i18n.t.hero.image || '';
		// Get just the filename ("wardal-hero.jpg")
		const filename = targetPath.split('/').pop();
		const defaultImage = images['/src/lib/assets/wardal-hero.jpg'];
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

<div class="relative flex min-h-[90vh] items-center overflow-hidden bg-background pb-18">
	<div class="container mx-auto px-6 py-12 lg:py-24">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
			<!-- Text Content -->
			<div class="z-10 lg:col-span-7">
				<h1
					class="mt-18 mb-8 font-display text-5xl leading-[1.05] text-brand italic md:text-6xl lg:mt-0 lg:text-7xl"
				>
					{i18n.t.hero.title}
				</h1>

				<p class="mb-18 max-w-xl text-xl leading-relaxed font-light tracking-wide md:text-2xl">
					{i18n.t.hero.subtitle}
				</p>

				<div class="flex flex-col gap-4 sm:flex-row">
					<Button size="xl" href={l('/availability')}>
						{i18n.t.hero.cta_primary}
					</Button>
					<Button size="xl" variant="secondary" href={l('/#approach')}>
						{i18n.t.hero.cta_secondary}
					</Button>
				</div>
			</div>

			<!-- Image Section -->
			<div class="relative lg:col-span-5">
				<div
					class="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-brand opacity-20 mix-blend-multiply blur-3xl filter"
				></div>

				<div
					class="relative rotate-1 transform overflow-hidden rounded-3xl bg-transparent shadow-2xl shadow-brand/15"
				>
					{#if getHeroImage()}
						<enhanced:img
							src={getHeroImage()}
							alt={i18n.t.hero.image_alt}
							class="aspect-4/5 h-auto w-full rounded-3xl border-12 border-border/50 object-cover"
							loading="eager"
							fetchpriority="high"
						/>
					{/if}

					<!-- Quote Badge -->
					{#if i18n.t.hero.quote}
						<div
							class="absolute right-6 bottom-6 left-6 inline-flex justify-center rounded-2xl bg-secondary p-5 text-on-secondary shadow-md shadow-brand/15"
						>
							<q class="w-full text-center font-serif leading-snug italic md:text-lg">
								{i18n.t.hero.quote}
							</q>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
