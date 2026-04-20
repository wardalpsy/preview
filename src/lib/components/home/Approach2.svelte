<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Picture } from '@sveltejs/enhanced-img';
	import { i18n } from '$lib/i18n.svelte';

	//Icons
	import IconBrain from 'virtual:icons/tabler/brain';
	import IconSparkles from 'virtual:icons/tabler/sparkles';
	const images = import.meta.glob<Picture>(
		'$lib/assets/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			query: { enhanced: true },
			import: 'default',
			eager: true
		}
	);
	// Robust lookup: find the image that matches the filename from the JSON
	const getApproachImage = () => {
		const targetPath = i18n.t.approach.image || '';
		// Get just the filename ("hero-wardal.jpg")
		const filename = targetPath.split('/').pop();
		const defaultImage = images['/src/lib/assets/images/patrycja-nikki.jpg'];
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

<section class="overflow-hidden bg-white py-24">
	<div class="container mx-auto px-6">
		<div class="flex flex-col items-center gap-16 lg:flex-row lg:items-start">
			<!-- Image Column -->
			<div class="w-full lg:w-5/12">
				<div class="group relative">
					<div
						class="bg-wardal-green/10 absolute -top-6 -left-6 h-32 w-32 rounded-full blur-3xl"
					></div>
					<div
						class="border-wardal-white relative overflow-hidden rounded-[2rem] border-8 shadow-2xl"
					>
						{#if getApproachImage()}
							<enhanced:img
								src={getApproachImage()}
								alt={i18n.t.hero.image_alt}
								class="aspect-4/5 h-auto w-full rounded-3xl border-12 border-border/50 object-cover"
								loading="eager"
								fetchpriority="high"
							/>
						{/if}
					</div>
					<!-- Floating Caption for Nikki -->
					<div
						class="border-wardal-sand absolute right-6 bottom-6 rounded-full border bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm"
					>
						<span class="text-wardal-green text-[10px] font-bold tracking-widest uppercase italic"
							>Con Nikki, la mia co-terapeuta</span
						>
					</div>
				</div>
			</div>

			<!-- Text Column -->
			<div class="w-full space-y-8 lg:w-7/12">
				<header class="space-y-4">
					<h2 class="text-wardal-purple font-serif text-4xl leading-tight md:text-5xl">
						{i18n.t.title}
					</h2>
					<div class="bg-wardal-green h-1 w-12 rounded-full"></div>
				</header>

				<div class="text-wardal-brown space-y-6 text-lg leading-relaxed">
					<p class="text-wardal-purple font-medium italic">"{i18n.t.intro}"</p>
					<p>{i18n.t.philosophy}</p>
					<p class="text-wardal-brown/80 border-wardal-sand border-l-2 pl-6 text-base italic">
						{i18n.t.nikki_note}
					</p>
				</div>

				<!-- Target Audience -->
				<div class="space-y-4 pt-4">
					<h4 class="text-wardal-purple text-xs font-bold tracking-widest uppercase">
						{i18n.t.target_title}
					</h4>
					<ul class="flex flex-wrap gap-3">
						{#each i18n.t.targets as target}
							<li
								class="bg-wardal-white border-wardal-sand text-wardal-brown rounded-full border px-4 py-1.5 text-sm"
							>
								{target}
							</li>
						{/each}
					</ul>
				</div>

				<!-- Interaction Boxes (Dialog Triggers) -->
				<div class="grid gap-4 pt-8 sm:grid-cols-2">
					<!-- Dialog 1: Ericksoniano -->
					<Dialog.Root>
						<Dialog.Trigger
							class="bg-wardal-white border-wardal-sand hover:border-wardal-green group flex items-center justify-between rounded-2xl border p-6 text-left transition-all hover:shadow-lg"
						>
							<div class="space-y-1">
								<span class="text-wardal-brown/60 text-[10px] tracking-widest uppercase"
									>Metodo</span
								>
								<p class="text-wardal-purple font-serif text-lg">{i18n.t.dialog1_trigger}</p>
							</div>
							<IconSparkles
								class="text-wardal-sand group-hover:text-wardal-green transition-colors"
								size={24}
							/>
						</Dialog.Trigger>
						<Dialog.Content
							class="max-h-[80vh] overflow-y-auto rounded-[2rem] bg-white p-10 sm:max-w-[600px]"
						>
							<Dialog.Header>
								<Dialog.Title class="text-wardal-purple mb-6 font-serif text-3xl"
									>{i18n.t.dialog1_title}</Dialog.Title
								>
							</Dialog.Header>
							<div class="text-wardal-brown space-y-4 leading-relaxed whitespace-pre-line">
								{i18n.t.dialog1_content}
							</div>
						</Dialog.Content>
					</Dialog.Root>

					<!-- Dialog 2: Ipnosi -->
					<Dialog.Root>
						<Dialog.Trigger
							class="bg-wardal-white border-wardal-sand hover:border-wardal-green group flex items-center justify-between rounded-2xl border p-6 text-left transition-all hover:shadow-lg"
						>
							<div class="space-y-1">
								<span class="text-wardal-brown/60 text-[10px] tracking-widest uppercase"
									>Tecnica</span
								>
								<p class="text-wardal-purple font-serif text-lg">{i18n.t.dialog2_trigger}</p>
							</div>
							<IconBrain
								class="text-wardal-sand group-hover:text-wardal-green transition-colors"
								size={24}
							/>
						</Dialog.Trigger>
						<Dialog.Content
							class="max-h-[80vh] overflow-y-auto rounded-[2rem] bg-white p-10 sm:max-w-[600px]"
						>
							<Dialog.Header>
								<Dialog.Title class="text-wardal-purple mb-6 font-serif text-3xl"
									>{i18n.t.dialog2_title}</Dialog.Title
								>
							</Dialog.Header>
							<div class="text-wardal-brown space-y-4 leading-relaxed whitespace-pre-line">
								{i18n.t.dialog2_content}
							</div>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
		</div>
	</div>
</section>
