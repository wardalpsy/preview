<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
</script>

{#snippet serviceCard(title: string, description: string)}
	<div
		class="group relative rounded-3xl border border-border bg-white p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-brand/10"
	>
		<!-- Minimalist Icon/Indicator -->
		<div class="mb-6 flex items-center gap-3">
			<div
				class="h-2 w-2 rounded-full bg-primary transition-transform group-hover:scale-150 group-hover:bg-brand"
			></div>
			<div class="h-px w-8 bg-border"></div>
		</div>

		<h3
			class="text-wardal-purple group-hover:text-wardal-green mb-4 font-serif text-xl transition-colors"
		>
			{title}
		</h3>

		<p class="text-sm leading-relaxed">
			{description}
		</p>
	</div>
{/snippet}

<section id="practices" class="my-20 scroll-m-12 py-12">
	<div class="container mx-auto px-6">
		<!-- Section Header -->
		<div class="mb-16 max-w-2xl">
			<h2 class="home-section_h2">
				{i18n.t.practices.title}
			</h2>
			<p class="home-section_subtitle max-w-xl">
				{i18n.t.practices.subtitle}
			</p>
		</div>

		<!-- practices Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
			{#each i18n.t.practices.items as item (item.id)}
				{@render serviceCard(item.title, item.description)}
			{/each}
		</div>

		<!-- Bottom CTA context -->
		<div class="mt-16 text-center">
			<p class="text-sm italic">
				{i18n.t.practices.not_found}
				<a
					href="#contact"
					class="text-primary underline underline-offset-4 transition-colors hover:text-brand hover:decoration-2"
				>
					{i18n.t.practices.contact_me}
				</a>
			</p>
		</div>
	</div>
</section>
