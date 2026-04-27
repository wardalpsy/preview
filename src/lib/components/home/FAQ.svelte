<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { i18n } from '$lib/i18n.svelte';
	import { base } from '$app/paths';

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

<section id="faq" class="scroll-m-12 bg-background py-24">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-4xl">
			<!-- Header -->
			<div class="mb-16 space-y-4 text-center">
				<h2 class="home-section_h2">
					{i18n.t.faq.title}
				</h2>
				{#if i18n.t.faq.subtitle}
					<p class="home-section_subtitle mx-auto max-w-xl">
						{i18n.t.faq.subtitle}
					</p>
				{/if}
			</div>

			<Accordion.Root type="single" class="w-full space-y-4">
				{#each i18n.t.faq.items as item, i (item.id)}
					<Accordion.Item
						value={`item-${i}`}
						class="rounded-2xl border bg-white px-6 transition-all hover:border-primary/40"
					>
						<Accordion.Trigger
							class="cursor-pointer py-6 text-left text-lg text-primary hover:text-brand hover:no-underline"
						>
							{item.question}
						</Accordion.Trigger>
						<Accordion.Content
							class="pb-6 text-base leading-relaxed whitespace-pre-line text-foreground"
						>
							{item.answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>

			<!-- Support text -->
			<div class="mt-16 text-center">
				{#if i18n.t.faq.ask_me}
					<p class="text-sm italic">
						{#if i18n.t.faq.additional_question}
							{i18n.t.faq.additional_question}
						{/if}
						<a
							href={l('/#contact')}
							onmouseenter={() => {
								window.dispatchEvent(
									new CustomEvent('preload-component', { detail: { id: 'contact' } })
								);
							}}
							class="text-primary underline underline-offset-4 transition-colors hover:text-brand hover:decoration-2"
							>{i18n.t.faq.ask_me}</a
						>
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>
