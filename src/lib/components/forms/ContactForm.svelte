<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { getContactSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { i18n } from '$lib/i18n.svelte';

	let { data, subject = '' } = $props();
	// svelte-ignore state_referenced_locally
	const form = superForm(data.form, {
		validators: zod4Client(getContactSchema(i18n.t)),
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

<form method="POST" use:enhance class="space-y-6">
	<Form.Field {form} name="subject">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{i18n.t.contact.subject}<span class="form-required">*</span></Form.Label>
				<Input {...props} bind:value={$formData.subject} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<Form.Field {form} name="firstName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.first_name}<span class="form-required">*</span></Form.Label>
					<Input {...props} bind:value={$formData.firstName} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="lastName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.last_name}<span class="form-required">*</span></Form.Label>
					<Input {...props} bind:value={$formData.lastName} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.email}<span class="form-required">*</span></Form.Label>
					<Input {...props} type="email" bind:value={$formData.email} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="phone">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.phone}</Form.Label>
					<Input {...props} bind:value={$formData.phone} required={false} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Field {form} name="signature">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{i18n.t.contact.phone}</Form.Label>
				<Input {...props} bind:value={$formData.phone} required={false} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="message">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{i18n.t.contact.message}<span class="form-required">*</span></Form.Label>
				<Textarea
					{...props}
					bind:value={$formData.message}
					rows={4}
					placeholder={i18n.t.contact.avail_placeholder}
					class="text-foreground"
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button disabled={$delayed} class="w-full cursor-pointer" size="form">
		{#if $delayed}
			{i18n.t.contact.sending}
		{:else}
			{i18n.t.contact.send_request}
		{/if}
	</Form.Button>
</form>
