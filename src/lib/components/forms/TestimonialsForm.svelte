<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { getTestimonialSchema } from './schema';
	import { i18n } from '$lib/i18n.svelte';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	//Icons
	import IconX from 'virtual:icons/tabler/x';

	let { data } = $props();
	let open = $state(false);
	// svelte-ignore state_referenced_locally
	const form = superForm(data.testimonialForm, {
		id: 'testimonial-form',
		validators: zod4Client(getTestimonialSchema(i18n.t)),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(i18n.t.testimonials.success_msg);
				open = false;
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class="aria-expanded:text-secondary-foreground h-13 cursor-pointer gap-1.5 rounded-full  border border-border bg-brand-container px-10 text-on-brand-container hover:border-on-brand-container/30 hover:bg-brand-container/70 hover:shadow-xl hover:shadow-brand/10 aria-expanded:bg-secondary"
	>
		{i18n.t.testimonials.cta_button}
	</Dialog.Trigger>
	<Dialog.Content
		class="no-scrollbar max-h-[90vh] overflow-x-hidden overflow-y-auto rounded-3xl border border-border bg-secondary p-8 text-left text-on-secondary shadow-sm shadow-brand/15 sm:max-w-110"
		data-lenis-prevent
		showCloseButton={false}
	>
		<Dialog.Header>
			<div class="mb-6 flex items-center justify-between">
				<Dialog.Title class="font-serif text-2xl text-brand">
					{i18n.t.testimonials.modal_title}
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
			<Dialog.Description class="text-sm text-foreground/80">
				{i18n.t.testimonials.modal_desc}
			</Dialog.Description>
		</Dialog.Header>

		<form method="POST" action="?/submitTestimonial" use:enhance class="space-y-6 pt-4">
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>{i18n.t.testimonials.name_label}</Form.Label>
						<Input {...props} bind:value={$formData.name} class="h-10" required={false} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="testimonial">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							>{i18n.t.testimonials.msg_label} <span class="form-required">*</span></Form.Label
						>
						<Textarea {...props} bind:value={$formData.testimonial} rows={4} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field
				{form}
				name="isAnonymous"
				class="flex items-start space-y-0 space-x-3 rounded-md border border-border bg-white p-4"
			>
				<Form.Control>
					{#snippet children({ props })}
						<Checkbox {...props} bind:checked={$formData.isAnonymous} />
						<div class="space-y-1 leading-none">
							<Form.Label>{i18n.t.testimonials.anon_label}</Form.Label>
							<p class="text-xs text-foreground">
								{i18n.t.testimonials.anon_hint}
							</p>
							<p class="text-xs text-foreground italic">
								<a
									href="/policy"
									class="text-primary underline underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
									>{i18n.t.testimonials.policy_link}</a
								>&nbsp;{i18n.t.testimonials.policy_info}
							</p>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Button disabled={$delayed} class="w-full cursor-pointer" size="form">
				{$delayed ? '...' : i18n.t.testimonials.submit_btn}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
