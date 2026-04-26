<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import PreviewCalendarHeadless from '$lib/components/calendars/PreviewCalendarHeadless.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();

	let subject = $state('');
	let showForm = $state(false);
	let formContainer: HTMLElement | null = $state(null);

	function handleSelection({
		date,
		time,
		italyTime,
		userTz
	}: {
		date: string;
		time: string;
		italyTime: string;
		userTz: string;
	}) {
		// Example: Appointment request from Friday, 17 Apr at 09:00 (Europe/London) / 10:00 (Italy)
		subject = `${date} at ${time} (${userTz}) / ${italyTime} (Italy time)`;
		showForm = true;

		// Wait for the next tick/animation to ensure formContainer is available
		setTimeout(() => {
			if (formContainer) {
				formContainer.scrollIntoView({ behavior: 'smooth' });
			}
		}, 50);
	}
</script>

<section class="min-h-screen bg-background py-20">
	<div class="container mx-auto px-6 text-center">
		<h1 class="mb-6 font-serif text-4xl text-brand">
			{i18n.t.sessions.title}
		</h1>
		<p class="mx-auto mb-12 max-w-2xl text-foreground">
			{i18n.t.sessions.subtitle}
		</p>

		<div class="mx-auto mt-12 max-w-4xl space-y-12">
			<PreviewCalendarHeadless onSelect={handleSelection} />

			{#if showForm}
				<div
					transition:slide={{ duration: 500 }}
					bind:this={formContainer}
					class="scroll-mt-32 rounded-3xl border border-border bg-secondary p-8 text-left text-on-secondary shadow-sm"
				>
					<h2 class="mb-6 font-serif text-3xl text-brand">{i18n.t.contact.complete_request}</h2>
					<p class="text-sm text-foreground/80">
						{i18n.t.contact.request_appointment_info}
						<strong>{subject}</strong>.
					</p>
					<p class="mb-6 text-sm text-foreground/80">{i18n.t.contact.request_info}</p>
					<ContactForm {data} {subject} />
				</div>
			{/if}
			<div class="flex flex-wrap items-center justify-center gap-6">
				<Button
					href="https://wa.me/{i18n.t.footer.whatsapp}?text={i18n.t.contact
						.whatsapp_appointment_message}"
					size="md"
					target="_blank"
					rel="noopener noreferrer"
				>
					{i18n.t.sessions.cta_whatsapp} <span class="sr-only">${i18n.t.footer.external_link}</span>
				</Button>
			</div>
		</div>
	</div>
</section>
