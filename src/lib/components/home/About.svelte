<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { Picture } from '@sveltejs/enhanced-img';
	//Icons
	//import IconArrowRight from 'virtual:icons/tabler/arrow-right';

	// Dynamically import all images in the assets directory
	// Added uppercase extensions to handle files like .JPG
	const images = import.meta.glob<Picture>(
		'/src/lib/assets/images/**/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP,svg,SVG}',
		{
			query: { enhanced: true },
			import: 'default',
			eager: true
		}
	);

	// Find the image that matches the filename from the metadata
	const getAboutImage = () => {
		const targetPath = about?.image || '';
		const filename = targetPath.split('/').pop();
		const defaultImage = images['/src/lib/assets/about-wardal.jpg'];
		if (!filename) return defaultImage;

		for (const globPath in images) {
			if (globPath.toLowerCase().endsWith(filename.toLowerCase())) {
				return images[globPath];
			}
		}

		return defaultImage;
	};

	let { about, content: Content } = $props();

	// Use derived to fix TS error and handle reactivity
	const aboutImage = $derived(getAboutImage());
</script>

<section id="about" class="scroll-m-12 overflow-hidden border-y-2 border-border bg-white py-24">
	<div class="container mx-auto px-6">
		<div class="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
			<!-- Image Container -->
			<div class="relative w-full lg:w-1/2">
				<div class="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-brand/20 blur-3xl"></div>

				<div class="relative z-10">
					<div
						class="mx-auto aspect-[751/1000] max-w-[500px] overflow-hidden rounded-[10rem] border-12 border-border/50 shadow-2xl shadow-brand/15 lg:ml-0"
					>
						{#if aboutImage}
							<enhanced:img
								src={aboutImage}
								alt={about?.image_alt || i18n.t.about.image_alt}
								class="h-full w-full object-cover"
								loading="lazy"
							/>
						{:else}
							<div class="flex aspect-[751/1000] w-full items-center justify-center bg-muted/20">
								<span class="text-sm text-muted-foreground italic">Photo not found</span>
							</div>
						{/if}
					</div>

					{#if about?.quote}
						<div
							class="absolute -right-6 -bottom-6 hidden rounded-2xl bg-background p-6 shadow-xl md:block"
						>
							<p class="text-center font-serif leading-snug font-medium md:text-base">
								"{about.quote}"
							</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Content Container -->
			<div class="w-full space-y-8 lg:w-1/2">
				<div class="space-y-4">
					<span
						class="inline-block border-b-2 border-primary-container pb-1 text-xs font-semibold tracking-[0.2em] text-primary uppercase"
					>
						{i18n.t.about.badge}
					</span>
					<h2 class="font-display text-4xl leading-tight text-brand md:text-5xl">
						{about?.title || i18n.t.about.title}
					</h2>
					{#if about?.subtitle || i18n.t.about.subtitle}
						<p class="text-xl font-light italic">
							"{about?.subtitle || i18n.t.about.subtitle}"
						</p>
					{/if}
				</div>

				<div class="space-y-6 leading-relaxed">
					{#if Content}
						<div class="prose prose-wardal max-w-none">
							<Content />
						</div>
					{:else}
						<p class="animate-pulse text-muted-foreground/50 italic">Loading content...</p>
					{/if}
				</div>

				<!--<div class="pt-4">
					<a
						href={l('/about')}
						class="group inline-flex items-center gap-3 font-medium text-primary transition-colors hover:text-brand"
					>
						<span>{i18n.t.about.cta}</span>
						<IconArrowRight
							class="transition-transform group-hover:translate-x-2"
							aria-hidden="true"
						/>
					</a>
				</div>-->
			</div>
		</div>
	</div>
</section>

<style>
	/* Custom Typography for mdsvex content */
	:global(.prose-wardal) {
		--tw-prose-body: hsl(var(--foreground));
		--tw-prose-headings: hsl(var(--brand));
		--tw-prose-links: hsl(var(--brand));
		--tw-prose-bold: hsl(var(--brand));
	}

	:global(.prose p) {
		margin-bottom: 1.5rem;
		line-height: 1.8;
	}
</style>
