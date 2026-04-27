<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { getIcon } from 'virtual:cms-icons';
	import { base } from '$app/paths';

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

{#snippet serviceCard(title: string, description: string, iconName: string, no_decoration: boolean)}
	{@const Icon = iconName ? getIcon(iconName) : null}
	<div
		class="group relative rounded-3xl border border-border bg-white p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-brand/10"
	>
		{#if !no_decoration}
			{#if Icon}
				<div
					class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand"
				>
					<Icon class="size-6" aria-hidden="true" />
				</div>
			{:else}
				<!-- Minimalist Icon/Indicator if icon is empty -->
				<div class="mb-6 flex items-center gap-3">
					<div
						class="h-2 w-2 rounded-full bg-primary transition-transform group-hover:scale-150 group-hover:bg-brand"
					></div>
					<div class="h-px w-8 bg-border"></div>
				</div>
			{/if}
		{/if}

		<h3 class="mb-4 font-serif text-xl">
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
				{i18n.t.services.title}
			</h2>
			<p class="home-section_subtitle max-w-xl">
				{i18n.t.services.subtitle}
			</p>
		</div>

		<!-- services Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
			{#each i18n.t.services.items as item (item.id)}
				{@render serviceCard(item.title, item.description, item.icon, item.no_decoration)}
			{/each}
		</div>

		<!-- Bottom CTA context -->
		<div class="mt-16 text-center">
			{#if i18n.t.services.contact_me}
				<p class="text-sm italic">
					{#if i18n.t.services.not_found}
						{i18n.t.services.not_found}
					{/if}
					<a
						href={l('/#contact')}
						onmouseenter={() => {
							window.dispatchEvent(
								new CustomEvent('preload-component', { detail: { id: 'contact' } })
							);
						}}
						class="text-primary underline underline-offset-4 transition-colors hover:text-brand hover:decoration-2"
					>
						{i18n.t.services.contact_me}
					</a>
				</p>
			{/if}
		</div>
	</div>
</section>
