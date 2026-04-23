<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { Picture } from '@sveltejs/enhanced-img';
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};

	// Dynamically import all images in the assets directory with the enhanced query
	const images = import.meta.glob<Picture>(
		'$lib/assets/images/**/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP,svg,SVG}',
		{
			query: { enhanced: true },
			import: 'default',
			eager: true
		}
	);

	// Image lookup with failsafe
	const ULTIMATE_FALLBACK = `/src/lib/assets/images/failsafe/wardalpsy-hero-en.jpg`;

	const getHeroImage = (): Picture | undefined => {
		const lang = i18n.currentLang;
		const targetPath: string = i18n.t.hero.image ?? '';
		const filename = targetPath.split('/').pop();

		const langDefault = `/src/lib/assets/images/failsafe/wardalpsy-hero-${lang}.jpg`;

		if (filename) {
			const key = `/src/lib/assets/images/${filename}`;
			return images[key] ?? images[langDefault] ?? images[ULTIMATE_FALLBACK];
		}

		return images[langDefault] ?? images[ULTIMATE_FALLBACK];
	};

	const heroImage = $derived(getHeroImage());
</script>

<div class="relative flex min-h-[90vh] items-center overflow-hidden bg-background pb-18">
	<div class="container mx-auto px-4 py-12 lg:py-24">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 xl:grid-cols-[1fr_1fr]">
			<!-- Text Content -->
			<div class="z-10 mb-18">
				<h1
					class="mb-8 text-center font-display text-5xl leading-[1.05] text-brand italic sm:text-left md:text-6xl lg:mt-0 lg:px-0 lg:text-center lg:text-7xl xl:text-left xl:text-8xl"
				>
					{i18n.t.hero.title}
				</h1>

				<p
					class="mb-18 max-w-xl text-center text-xl leading-relaxed font-light tracking-wide sm:text-left md:text-2xl lg:text-center xl:text-left"
				>
					{i18n.t.hero.subtitle}
				</p>

				<div class="flex flex-col gap-4 sm:flex-row">
					<Button size="xl" href={l('/#practices')}>
						{i18n.t.hero.cta_primary}
					</Button>
					<Button size="xl" variant="secondary" href={l('/#approach')}>
						{i18n.t.hero.cta_secondary}
					</Button>
				</div>
			</div>

			<!-- Image Section -->
			<div class="relative">
				<div
					class="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-brand opacity-20 mix-blend-multiply blur-3xl filter"
				></div>
				<div
					class="relative mx-auto w-fit rotate-1 transform overflow-hidden rounded-3xl bg-background shadow-2xl shadow-brand/15 sm:h-150 xl:h-160"
				>
					{#if heroImage}
						<enhanced:img
							src={heroImage}
							alt={i18n.t.hero.image_alt}
							class="aspect-4/5 h-130 w-auto rounded-3xl border-12 border-border/50 sm:h-150 xl:h-160"
							fetchpriority="high"
						/>
					{/if}

					<!-- Quote Badge -->
					{#if i18n.t.hero.quote}
						<div
							class="absolute top-6 right-6 left-6 inline-flex justify-center rounded-2xl bg-secondary p-3 text-on-secondary shadow-md shadow-brand/15"
						>
							<q
								class="w-full text-center font-display text-lg leading-snug font-medium italic lg:text-xl"
							>
								{i18n.t.hero.quote}
							</q>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
