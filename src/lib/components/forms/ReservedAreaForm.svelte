<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { i18n } from '$lib/i18n.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { getPasswordSchema } from './schema';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	const form = superForm(data.form, {
		validators: zod4Client(getPasswordSchema(i18n.t)),
		onUpdated: ({ form: f }) => {
			if (f.message && !f.valid) {
				toast.error(f.message);
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance class="space-y-6">
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{i18n.t.consent.password}<span class="form-required">*</span></Form.Label>
				<Input {...props} type="password" bind:value={$formData.password} class="h-13" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors class="text-xs text-red-500" />
	</Form.Field>

	<Form.Button disabled={$delayed} size="form" variant="default" class="w-full cursor-pointer">
		{#if $delayed}
			{i18n.t.contact.sending || 'Verifying...'}
		{:else}
			{i18n.t.consent.access || 'Access'}
		{/if}
	</Form.Button>
</form>
