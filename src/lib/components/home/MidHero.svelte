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
		const targetPath: string = i18n.t.mid_hero.image ?? '';
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

<section id="mid-hero" class="bg-wardal-white relative scroll-m-12 overflow-hidden py-12 md:py-24">
	<div class="container mx-auto px-6">
		<!-- Main Bento Grid -->
		<div class="grid grid-cols-1 gap-12 lg:auto-rows-auto lg:grid-cols-12">
			<!-- LEFT CELL: The Illustration (Occupies 5 columns on large, spans full height) -->
			<div class="order-1 lg:order-1 lg:col-span-5 lg:row-span-2">
				<div
					class="h-120 w-full transform transition-transform duration-1000 hover:rotate-1 sm:h-150 lg:h-133 xl:h-127"
				>
					{#if midHeroImage}
						<enhanced:img
							src={midHeroImage}
							alt={i18n.t.mid_hero.image_alt}
							class="h-full w-full rounded-[2.5rem] border bg-white object-cover object-center shadow-sm shadow-brand/15"
							loading="lazy"
						/>
					{/if}
				</div>
			</div>

			<!-- RIGHT TOP CELL: Title & Subtitle -->
			<div class="order-2 lg:order-2 lg:col-span-7">
				<div class="flex h-full flex-col justify-center rounded-[2.5rem]">
					<h2 class="home-section_h2">
						{i18n.t.mid_hero.h2_title}
					</h2>
					<p class="home-section_subtitle max-w-lg">
						{i18n.t.mid_hero.subtitle}
					</p>
				</div>
			</div>

			<!-- RIGHT BOTTOM CELL: The Two Cards (Nested Grid) -->
			<div class="order-3 lg:order-3 lg:col-span-7">
				<div class="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2">
					<!-- Public Path -->
					<div
						class="group flex w-full flex-col items-center rounded-[2.5rem] border bg-white p-8 text-center shadow-sm shadow-brand/15 transition-all duration-300 sm:w-70 md:w-80 lg:w-60 xl:w-full"
					>
						<div
							class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300"
						>
							<IconCalendar class="size-5" aria-hidden="true" />
						</div>

						<h3 class="mb-3 font-serif text-2xl text-brand">
							{i18n.t.mid_hero.public_title}
						</h3>

						<p class="mb-6 grow text-sm leading-relaxed text-foreground/90">
							{i18n.t.mid_hero.public_desc}
						</p>

						<Button
							href={l('/availability')}
							variant="default"
							size="xl"
							class="w-full cursor-pointer"
						>
							{i18n.t.mid_hero.cta_primary}
						</Button>
					</div>

					<!-- Reserved Path -->
					<div
						class="group flex w-full flex-col items-center rounded-[2.5rem] border bg-white p-8 text-center shadow-sm shadow-brand/15 transition-all duration-300 sm:w-70 md:w-80 lg:w-60 xl:w-full"
					>
						<div
							class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300"
						>
							<IconLock class="size-5" aria-hidden="true" />
						</div>

						<h3 class="mb-3 font-serif text-2xl text-brand">
							{i18n.t.mid_hero.reserved_title}
						</h3>

						<p class="mb-6 grow text-sm leading-relaxed text-foreground/90">
							{i18n.t.mid_hero.reserved_desc}
						</p>

						<Button
							href={l('/reserved')}
							variant="secondary"
							size="xl"
							class="w-full cursor-pointer"
						>
							{i18n.t.mid_hero.cta_secondary}
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
