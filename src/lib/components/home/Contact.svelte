<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { getContactSectionSchema } from '../forms/schema';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { i18n } from '$lib/i18n.svelte';

	let { data, subject = '' } = $props();
	// svelte-ignore state_referenced_locally
	const form = superForm(data.contactSectionForm, {
		id: 'contact-section-form',
		validators: zod4Client(getContactSectionSchema(i18n.t)),
		onUpdated: ({ form: f }) => {
			if (f.message) {
				if (f.valid) {
					toast.success(f.message);
				} else {
					toast.error(f.message);
				}
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	$effect(() => {
		if (subject) {
			$formData.subject = subject;
		}
	});
</script>

<section id="contact" class="relative scroll-m-16 overflow-hidden bg-background pt-24 pb-36">
	<!-- Background Detail -->
	<div
		class="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand/20 blur-3xl"
	></div>
	<div class="relative z-10 container mx-auto px-6">
		<div
			class="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-xl shadow-brand/15 md:flex-row"
		>
			<!-- Info Side -->
			<div class="flex flex-col justify-between bg-brand p-12 text-white md:w-1/3">
				<div class="space-y-6">
					<h2 class="text-center font-serif text-3xl">{i18n.t.contact.section_title}</h2>
				</div>
				{#if i18n.t.contact.section_subtitle}
					<div class="mt-12 text-xs">
						<p class="text-center text-sm leading-relaxed text-on-brand">
							{i18n.t.contact.section_subtitle}
						</p>
					</div>
				{/if}
			</div>

			<!-- Form Side -->
			<div class="p-12 md:w-2/3">
				<form method="POST" action="?/submitContactSection" use:enhance class="space-y-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<Form.Field {form} name="name">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label
											>{i18n.t.contact.section_name}<span class="form-required">*</span></Form.Label
										>
										<Input {...props} bind:value={$formData.name} class="h-10" />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div class="space-y-2">
							<Form.Field {form} name="email">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label
											>{i18n.t.contact.section_email}<span class="form-required">*</span
											></Form.Label
										>
										<Input {...props} type="email" bind:value={$formData.email} class="h-10" />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
					<div class="space-y-2">
						<Form.Field {form} name="message">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label
										>{i18n.t.contact.section_message}<span class="form-required">*</span
										></Form.Label
									>
									<Textarea
										{...props}
										bind:value={$formData.message}
										rows={4}
										class="text-foreground"
									/>
								{/snippet}
							</Form.Control>
							<p class="text-xs text-foreground italic">{i18n.t.contact.section_required}</p>
							<p class="text-xs text-foreground italic">
								{i18n.t.contact.section_policy_info}&nbsp;<a
									href="/policy"
									class="text-primary underline underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
									>{i18n.t.contact.section_policy_link}</a
								>
							</p>
							<Form.FieldErrors />
						</Form.Field>
					</div>

					<Form.Button disabled={$delayed} class="w-full cursor-pointer" size="form">
						{#if $delayed}
							{i18n.t.contact.section_sending}
						{:else}
							{i18n.t.contact.section_send_message}
						{/if}
					</Form.Button>
				</form>
			</div>
		</div>
	</div>
</section>
