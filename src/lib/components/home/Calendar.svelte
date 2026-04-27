<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import PreviewCalendarHeadless from '$lib/components/calendars/PreviewCalendarHeadless.svelte';
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	//Icons
	import IconX from 'virtual:icons/tabler/x';

	let { data } = $props();

	let subject = $state('');
	let isDialogOpen = $state(false);

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
		subject = `${date} at ${time} (${userTz}) / ${italyTime} (Italy time)`;
		isDialogOpen = true;
	}
</script>

<section class="bg-background py-20">
	<div class="container mx-auto px-6 text-center">
		<h2 class="mb-6 font-serif text-4xl text-brand">
			{i18n.t.sessions.title}
		</h2>
		<p class="mx-auto mb-12 max-w-2xl text-foreground">
			{i18n.t.sessions.subtitle}
		</p>

		<div class="mx-auto mt-12 max-w-4xl space-y-12">
			<PreviewCalendarHeadless onSelect={handleSelection} />
			<!--
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
			</div>-->
		</div>
	</div>
</section>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Content
		class="no-scrollbar max-h-[80vh] overflow-x-hidden overflow-y-auto rounded-3xl border border-border bg-secondary p-8 text-left text-on-secondary shadow-sm shadow-brand/15 sm:max-w-150"
		data-lenis-prevent
		showCloseButton={false}
	>
		<Dialog.Header>
			<div class="mb-6 flex items-center justify-between">
				<Dialog.Title class="font-serif text-2xl text-brand">
					{i18n.t.contact.complete_request}
				</Dialog.Title>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button variant="icon" size="icon" class="shrink-0 cursor-pointer" {...props}>
							<IconX class="size-4" aria-hidden="true" />
							<span class="sr-only">{i18n.t.a11y.close}</span>
						</Button>
					{/snippet}
				</Dialog.Close>
			</div>
			<Dialog.Description>
				<p class="text-sm text-foreground/80">
					{i18n.t.contact.request_appointment_info}
					<strong>{subject}</strong>.
				</p>
				<p class="mt-2 text-sm text-foreground/80">{i18n.t.contact.request_info}</p>
			</Dialog.Description>
		</Dialog.Header>

		<div class="py-4">
			<ContactForm {data} {subject} id="appointmentForm" action="?/submitAppointment" />
		</div>
	</Dialog.Content>
</Dialog.Root>
