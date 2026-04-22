<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Picture } from '@sveltejs/enhanced-img';
	import { i18n } from '$lib/i18n.svelte';

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
	const ULTIMATE_FALLBACK = `/src/lib/assets/images/failsafe/patrycja-nikki.jpg`;

	const getApproachImage = (): Picture | undefined => {
		const targetPath: string = i18n.t.approach.image ?? '';
		const filename = targetPath.split('/').pop();

		const langDefault = `/src/lib/assets/images/failsafe/patrycja-nikki.jpg`;

		if (filename) {
			const key = `/src/lib/assets/images/${filename}`;
			return images[key] ?? images[langDefault] ?? images[ULTIMATE_FALLBACK];
		}

		return images[langDefault] ?? images[ULTIMATE_FALLBACK];
	};

	const approachImage = $derived(getApproachImage());
</script>

<section class="overflow-hidden bg-background py-32">
	<div class="container mx-auto px-6">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<div>
				<!-- Text Column -->
				<div class="w-full max-w-prose space-y-8">
					<header class="space-y-4">
						<h2 class="home-section_h2">
							{i18n.t.approach.title}
						</h2>
						<div class="h-1 w-12 rounded-full bg-primary"></div>
						<p class="home-section_subtitle">{i18n.t.approach.subtitle}</p>
					</header>

					<div class="space-y-4 text-lg leading-relaxed">
						{#each i18n.t.approach.paragraphs as p (p.id)}
							<p class="whitespace-pre-line">{p.paragraph}</p>
						{/each}
					</div>

					<!-- Target Audience -->
					<div class="space-y-4 pt-4">
						<h4 class="text-xs font-bold tracking-widest text-foreground/90 uppercase">
							{i18n.t.approach.target_title}
						</h4>
						<ul class="flex flex-wrap gap-3">
							{#each i18n.t.approach.targets as t (t.id)}
								<li
									class="rounded-full border border-brand/50 bg-white px-4 py-1.5 text-sm font-medium"
								>
									{t.target}
								</li>
							{/each}
						</ul>
					</div>
					<div class="space-y-4 pt-4">
						<h4 class="text-xs font-bold tracking-widest text-foreground/90 uppercase">
							{i18n.t.approach.dialogs_title}
						</h4>
						<!-- Interaction Boxes (Dialog Triggers) -->
						<div class="grid gap-4 pt-4 sm:grid-cols-2">
							<!-- Dialog 1: Ericksoniano -->
							<Dialog.Root>
								<Dialog.Trigger
									class="aria-expanded:text-secondary-foreground flex cursor-pointer flex-col items-start justify-center gap-2 rounded-2xl border border-border bg-brand-container p-6 text-on-brand-container hover:border-on-brand-container/30 hover:bg-brand-container/70 hover:shadow-xl hover:shadow-brand/15 aria-expanded:bg-secondary"
								>
									<span class="text-[10px] font-bold tracking-widest text-foreground uppercase"
										>{i18n.t.approach.dialog1_title}</span
									>
									<p class="font-serif text-lg">
										{i18n.t.approach.dialog1_trigger}
									</p>
								</Dialog.Trigger>
								<Dialog.Content
									class="max-h-[80vh] overflow-y-auto rounded-[2rem] bg-white p-10 sm:max-w-150"
								>
									<Dialog.Header>
										<Dialog.Title class="text-wardal-purple mb-6 font-serif text-3xl"
											>{i18n.t.approach.dialog1_title}</Dialog.Title
										>
									</Dialog.Header>
									<div class="text-wardal-brown space-y-4 leading-relaxed whitespace-pre-line">
										{i18n.t.approach.dialog1_content}
									</div>
								</Dialog.Content>
							</Dialog.Root>

							<!-- Dialog 2: Ipnosi -->
							<Dialog.Root>
								<Dialog.Trigger
									class="aria-expanded:text-secondary-foreground flex cursor-pointer flex-col items-start justify-center gap-2 rounded-2xl border border-border bg-brand-container p-6 text-on-brand-container hover:border-on-brand-container/30 hover:bg-brand-container/70 hover:shadow-xl hover:shadow-brand/15 aria-expanded:bg-secondary"
								>
									<span class="text-[10px] font-bold tracking-widest text-foreground uppercase"
										>{i18n.t.approach.dialog2_title}</span
									>
									<p class="font-serif text-lg">
										{i18n.t.approach.dialog2_trigger}
									</p>
								</Dialog.Trigger>
								<Dialog.Content
									class="max-h-[80vh] overflow-y-auto rounded-[2rem] bg-white p-10 sm:max-w-150"
								>
									<Dialog.Header>
										<Dialog.Title class="text-wardal-purple mb-6 font-serif text-3xl"
											>{i18n.t.approach.dialog2_title}</Dialog.Title
										>
									</Dialog.Header>
									<div class="text-wardal-brown space-y-4 leading-relaxed whitespace-pre-line">
										{i18n.t.approach.dialog2_content}
									</div>
								</Dialog.Content>
							</Dialog.Root>
						</div>
					</div>
				</div>
			</div>
			<div>
				<!-- Image Column -->
				<div class="mx-auto max-w-prose">
					<div class="group relative">
						<div class="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-brand/50 blur-3xl"></div>
						<div
							class="relative h-160 overflow-hidden rounded-[2rem] border-8 shadow-2xl md:h-180 lg:h-213 xl:h-176"
						>
							{#if approachImage}
								<enhanced:img
									src={approachImage}
									alt={i18n.t.hero.image_alt}
									class="aspect-4/5 h-full w-full rounded-3xl object-cover"
									loading="lazy"
								/>
							{/if}
						</div>
						<!-- Floating Caption for Nikki -->
						<div
							class="absolute right-6 bottom-6 left-6 inline-flex justify-center rounded-2xl bg-secondary/80 p-5 text-on-secondary shadow-md shadow-brand/15 backdrop-blur-sm"
						>
							<p class="w-full text-center font-serif leading-snug md:text-lg">
								{i18n.t.approach.nikki_note}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
