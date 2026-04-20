<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import Icon from '@iconify/svelte';
</script>

{#snippet pillar(title: string, description: string, iconName: string)}
	<div
		class="flex flex-col items-start rounded-2xl border border-border bg-white p-8 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-brand/10"
	>
		<div
			class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
		>
			<Icon icon="tabler:{iconName}" class="size-6" aria-hidden="true" />
		</div>
		<h3 class="mb-4 font-serif text-xl text-brand">{title}</h3>
		<p class="text-sm leading-relaxed">{description}</p>
	</div>
{/snippet}

<section id="approach" class="relative scroll-m-12 overflow-hidden bg-background py-24">
	<!-- Background Detail -->
	<div
		class="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl"
	></div>

	<div class="relative z-10 container mx-auto px-6">
		<div class="grid items-start gap-16 lg:grid-cols-12">
			<!-- Left Side: Title and Subtitle -->
			<div class="lg:col-span-5">
				<h2 class="home-section_h2">
					{i18n.t.approach.title}
				</h2>
				<p class="home-section_subtitle max-w-md">
					{i18n.t.approach.subtitle}
				</p>
			</div>

			<!-- Pillars -->
			<div class="grid gap-6 sm:grid-cols-2 lg:col-span-7">
				{#each i18n.t.approach.pillars as pillarData (pillarData.icon)}
					{@render pillar(pillarData.title, pillarData.description, pillarData.icon)}
				{/each}
			</div>
		</div>
	</div>
</section>
