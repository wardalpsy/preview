<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { getIcon } from 'virtual:cms-icons';
	import { base } from '$app/paths';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import IconX from 'virtual:icons/tabler/x';
	import type { Snippet } from 'svelte';

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

{#snippet cardContent(
	title: string,
	description: string,
	iconName: string,
	no_decoration: boolean,
	trigger?: Snippet
)}
	{@const Icon = iconName ? getIcon(iconName) : null}
	<div class="h-full">
		{#if !no_decoration || trigger}
			<div class="mb-6 flex items-center {no_decoration ? 'justify-end' : 'justify-between'}">
				{#if !no_decoration}
					{#if Icon}
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand"
						>
							<Icon class="size-6" aria-hidden="true" />
						</div>
					{:else}
						<!-- Minimalist Icon/Indicator if icon is empty -->
						<div class="flex items-center gap-3">
							<div
								class="h-2 w-2 rounded-full bg-primary transition-transform group-hover:scale-150 group-hover:bg-brand"
							></div>
							<div class="h-px w-8 bg-border"></div>
						</div>
					{/if}
				{/if}
				{@render trigger?.()}
			</div>
		{/if}

		<h3 class="mb-4 font-serif text-xl">
			{title}
		</h3>

		<p class="text-sm leading-relaxed">
			{description}
		</p>
	</div>
{/snippet}

{#snippet serviceCard(
	id: string,
	title: string,
	description: string,
	iconName: string,
	no_decoration: boolean,
	intervention_areas?: { term: string; description?: string }[]
)}
	<div
		class="group relative flex h-full flex-col rounded-3xl border border-border bg-white p-8 transition-all duration-500 hover:border-primary/30"
	>
		{#if id === '1' && intervention_areas}
			<Dialog.Root>
				{@render cardContent(title, description, iconName, no_decoration, triggerSnippet)}
				<Dialog.Content
					class="no-scrollbar max-h-[80vh] overflow-x-hidden overflow-y-auto rounded-3xl bg-background p-0 sm:max-w-150"
					data-lenis-prevent
					showCloseButton={false}
				>
					<Dialog.Header
						class="sticky top-0 z-10 w-full border-b bg-secondary px-6 py-4 text-on-secondary"
					>
						<div class="flex items-center justify-between">
							<Dialog.Title class="text-xl">{i18n.t.services.dialog_trigger_title}</Dialog.Title>
							<Dialog.Close>
								{#snippet child({ props })}
									<Button variant="icon" size="icon" class="cursor-pointer" {...props}>
										<IconX class="size-4" aria-hidden="true" />
										<span class="sr-only">{i18n.t.a11y.close}</span>
									</Button>
								{/snippet}
							</Dialog.Close>
						</div>
					</Dialog.Header>
					<div class="p-8">
						<dl class="space-y-8">
							{#each intervention_areas as area (area.term)}
								<div class="space-y-2">
									<dt class="font-serif text-xl text-brand">
										{area.term}
									</dt>
									{#if area.description}
										<dd class="text-sm leading-relaxed text-foreground/90">
											{area.description}
										</dd>
									{/if}
								</div>
							{/each}
						</dl>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			{@render cardContent(title, description, iconName, no_decoration)}
		{/if}
	</div>
{/snippet}

{#snippet triggerSnippet()}
	<Dialog.Trigger
		class="aria-expanded:text-secondary-foreground flex cursor-pointer  items-center justify-center gap-2 rounded-2xl bg-brand-container px-3 py-2 text-on-brand-container hover:border-on-brand-container/30 hover:bg-brand-container/70 hover:shadow-xl hover:shadow-brand/15 aria-expanded:bg-secondary"
	>
		{i18n.t.services.dialog_trigger}
	</Dialog.Trigger>
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
				{@render serviceCard(
					item.id,
					item.title,
					item.description,
					item.icon,
					item.no_decoration,
					item.intervention_areas
				)}
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
