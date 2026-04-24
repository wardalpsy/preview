<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { Picture } from '@sveltejs/enhanced-img';
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	//Icons
	import IconCalendar from 'virtual:icons/tabler/calendar-week';
	import IconLock from 'virtual:icons/tabler/lock';

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};

	// Dynamically import all images in the assets directory with the enhanced query
	const images = import.meta.glob<Picture>(
		'$lib/assets/images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			query: { enhanced: true },
			import: 'default',
			eager: true
		}
	);

	// Image lookup with failsafe
	const ULTIMATE_FALLBACK = `/src/lib/assets/images/failsafe/wardal-mid-hero-en.jpg`;

	const getMidHeroImage = (): Picture | undefined => {
		const lang = i18n.currentLang;
		const targetPath: string = i18n.t.cta.image ?? '';
		const filename = targetPath.split('/').pop();

		const langDefault = `/src/lib/assets/images/failsafe/wardal-mid-hero-${lang}.jpg`;

		if (filename) {
			const key = `/src/lib/assets/images/${filename}`;
			return images[key] ?? images[langDefault] ?? images[ULTIMATE_FALLBACK];
		}

		return images[langDefault] ?? images[ULTIMATE_FALLBACK];
	};

	const midHeroImage = $derived(getMidHeroImage());
</script>

<section id="sessions" class="relative scroll-m-12 overflow-hidden bg-background py-12 md:py-24">
	<div class="container mx-auto px-6">
		<!-- Main Bento Grid -->
		<div
			class="group grid grid-cols-1 gap-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] xl:grid-cols-7"
		>
			<!-- LEFT -->
			<div
				class="flex w-full items-center justify-center lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 xl:col-start-1 xl:col-end-4 xl:row-span-full"
			>
				<div
					class="h-130 w-fit transform rounded-3xl bg-background shadow-2xl shadow-brand/15 transition-transform duration-1000 group-hover:rotate-1 sm:h-150 lg:h-full xl:h-160"
				>
					{#if midHeroImage}
						<enhanced:img
							src={midHeroImage}
							alt={i18n.t.cta.image_alt}
							class="h-full w-auto rounded-3xl border-12 border-border/50 object-cover object-center"
							loading="lazy"
						/>
					{/if}
				</div>
			</div>
			<!-- RIGHT  TOP CELL-->

			<div
				class="lg:col-span-full lg:row-start-1 lg:row-end-2 xl:col-start-4 xl:col-end-8 xl:row-start-1 xl:row-end-2"
			>
				<div class="flex flex-col justify-center rounded-[2.5rem]">
					<h2 class="home-section_h2 xl:text-7xl">
						{i18n.t.cta.h2_title}
					</h2>
					{#if i18n.t.cta.subtitle}
						<p class="home-section_subtitle max-w-lg">
							{i18n.t.cta.subtitle}
						</p>
					{/if}
				</div>
			</div>

			<!-- RIGHT BOTTOM CELL: The Two Cards (Nested Grid) -->
			<div
				class=" flex flex-col items-center justify-center gap-6 lg:col-start-2 lg:col-end-2 lg:row-start-2 lg:row-end-3 xl:col-start-4 xl:col-end-8 xl:flex-row"
			>
				<!-- Public Path -->
				<div
					class="group flex w-full max-w-100 flex-col items-center rounded-[2.5rem] border bg-white p-8 text-center shadow-sm shadow-brand/15 transition-all duration-300 sm:max-w-110"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300"
					>
						<IconCalendar class="size-5" aria-hidden="true" />
					</div>

					<h3 class="mb-3 font-serif text-2xl text-brand">
						{i18n.t.cta.public_title}
					</h3>

					<p class="mb-6 grow text-sm leading-relaxed text-foreground/90">
						{i18n.t.cta.public_desc}
					</p>

					<Button
						href={l('/availability')}
						variant="default"
						size="xl"
						class="w-full cursor-pointer"
					>
						{i18n.t.cta.cta_primary}
					</Button>
				</div>

				<!-- Reserved Path -->
				<div
					class="group flex w-full max-w-100 flex-col items-center rounded-[2.5rem] border bg-white p-8 text-center shadow-sm shadow-brand/15 transition-all duration-300 sm:max-w-110"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300"
					>
						<IconLock class="size-5" aria-hidden="true" />
					</div>

					<h3 class="mb-3 font-serif text-2xl text-brand">
						{i18n.t.cta.reserved_title}
					</h3>

					<p class="mb-6 grow text-sm leading-relaxed text-foreground/90">
						{i18n.t.cta.reserved_desc}
					</p>

					<Button href={l('/reserved')} variant="secondary" size="xl" class="w-full cursor-pointer">
						{i18n.t.cta.cta_secondary}
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>
