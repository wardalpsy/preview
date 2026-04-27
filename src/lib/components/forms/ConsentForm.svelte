<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import SignaturePad from 'signature_pad';
	import { i18n } from '$lib/i18n.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { getConsentSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import { untrack, onMount } from 'svelte';
	//Icons
	import IconX from 'virtual:icons/tabler/x';
	let {
		form: serverForm,
		initialData,
		onComplete
	} = $props<{
		form: any;
		initialData?: any;
		onComplete: (data: {
			firstName: string;
			lastName: string;
			email: string;
			phone?: string;
			signature?: string;
			typedSignature?: string;
			signatureType: 'draw' | 'type';
			notMinor: boolean;
			birthCity: string;
			birthDate: string;
			addressResidence: string;
			cityResidence: string;
			taxId: string;
			isRead: boolean;
		}) => void;
	}>();

	// svelte-ignore state_referenced_locally
	const form = superForm(serverForm, {
		validators: zod4Client(getConsentSchema(i18n.t)),
		SPA: true,
		onUpdate: ({ form: f }) => {
			// Manually validate signature from pad if it's not captured yet
			if (signaturePad && !signaturePad.isEmpty() && signatureMethod === 'draw') {
				f.data.signature = signaturePad.toDataURL('image/png');
			}

			if (f.valid) {
				onComplete(f.data as any);
			} else {
				console.log('Form invalid:', f.errors);
				toast.error(
					i18n.t.consent.error_fill_all || 'Please fill in all fields and sign the form.'
				);
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	// Populate form with initial data if provided (e.g. when coming back from Step 3)
	onMount(() => {
		if (initialData) {
			Object.keys(initialData).forEach((key) => {
				// @ts-ignore
				$formData[key] = initialData[key];
			});
			if (initialData.signatureType) {
				signatureMethod = initialData.signatureType;
			}
		}
	});

	let canvasElement = $state<HTMLCanvasElement>();
	let signaturePad: SignaturePad | null = null;

	$effect(() => {
		if (canvasElement) {
			const resizeCanvas = () => {
				untrack(() => {
					if (!canvasElement || !signaturePad) return;
					const ratio = Math.max(window.devicePixelRatio || 1, 1);
					canvasElement.width = canvasElement.offsetWidth * ratio;
					canvasElement.height = canvasElement.offsetHeight * ratio;
					canvasElement.getContext('2d')!.scale(ratio, ratio);
					signaturePad.clear();

					// If we have initial signature data, load it after resize
					if ($formData.signature && signatureMethod === 'draw') {
						signaturePad.fromDataURL($formData.signature);
					}
				});
			};

			untrack(() => {
				signaturePad = new SignaturePad(canvasElement!, {
					backgroundColor: 'rgba(255, 255, 255, 0)',
					penColor: 'rgb(93, 65, 87)'
				});

				window.addEventListener('resize', resizeCanvas);
				resizeCanvas();

				// If we have initial signature data, load it
				if ($formData.signature && signatureMethod === 'draw') {
					signaturePad.fromDataURL($formData.signature);
				}

				signaturePad.addEventListener('endStroke', () => {
					$formData.signature = signaturePad!.toDataURL('image/png');
				});
			});

			return () => {
				window.removeEventListener('resize', resizeCanvas);
			};
		}
	});

	function clearSignature() {
		signaturePad?.clear();
		$formData.signature = '';
	}

	let signatureMethod = $state<'draw' | 'type'>('draw');

	function handleSwitchMethod() {
		signatureMethod = signatureMethod === 'draw' ? 'type' : 'draw';
		$formData.signatureType = signatureMethod;
		// Clear both when switching to avoid confusion
		clearSignature();
		$formData.typedSignature = '';
	}

	// Dynamic Markdown loading for Consent
	let ConsentContent = $state<any>(null);
	let isDialogOpen = $state(false);

	$effect(() => {
		const lang = i18n.currentLang;
		const modules = import.meta.glob('/src/lib/legal/consent/*.md');
		const path = `/src/lib/legal/consent/${lang}.md`;

		if (modules[path]) {
			modules[path]().then((mod: any) => {
				ConsentContent = mod.default;
			});
		}
	});

	function acceptConsent() {
		$formData.isRead = true;
		isDialogOpen = false;
	}
	const parts = i18n.t.consent.legal_text_short.split('{link}');
</script>

<!-- Informed Consent Dialog -->
<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Content
		class="no-scrollbar max-h-[90vh] overflow-x-hidden overflow-y-auto bg-background p-0 sm:max-w-200"
		data-lenis-prevent
		showCloseButton={false}
	>
		<Dialog.Header
			class="sticky top-0 z-10 w-full border-b bg-secondary px-4 py-6 text-on-secondary"
		>
			<div class="flex items-center justify-end px-4">
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
		<div class="text-content-consent my-12 max-w-none px-4 sm:px-6">
			{#if ConsentContent}
				<ConsentContent />
			{:else}
				<div class="flex items-center justify-center py-12">
					<p class="animate-pulse text-foreground/80">{i18n.t.a11y.loading_consent}</p>
				</div>
			{/if}
		</div>
		<Dialog.Footer class="sticky bottom-0 z-10 border-t bg-secondary px-4 py-4 sm:justify-center">
			<Button size="lg" onclick={acceptConsent} class="w-full cursor-pointer sm:w-auto">
				{i18n.t.consent.accept_and_close || 'I have read and accept'}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<form
	use:enhance
	novalidate
	class="space-y-8 rounded-[2rem] border bg-secondary p-8 text-on-secondary shadow-sm md:p-12"
>
	<div class="max-w-none">
		<h2 class="text-2xl">{i18n.t.consent.form_title}</h2>
		<div class="mt-4 leading-relaxed">
			{parts[0]}
			<button
				type="button"
				onclick={() => (isDialogOpen = true)}
				class="cursor-pointer text-left text-primary underline underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
			>
				{i18n.t.consent.legal_text_short_link}
			</button>
			{parts[1]}
		</div>
	</div>
	<!-- Minors consent-->
	<Form.Field
		{form}
		name="notMinor"
		class="flex items-start space-y-0 space-x-3 rounded-md border border-border bg-white p-4"
	>
		<Form.Control>
			{#snippet children({ props })}
				<Checkbox {...props} bind:checked={$formData.notMinor} />
				<div class="space-y-1 leading-none">
					<Form.Label>{i18n.t.consent.not_minor}</Form.Label>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- First & Last Name -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<Form.Field {form} name="firstName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.first_name}<span class="form-required">*</span></Form.Label>
					<Input {...props} bind:value={$formData.firstName} class="h-10" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="lastName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.last_name}<span class="form-required">*</span></Form.Label>
					<Input {...props} bind:value={$formData.lastName} class="h-10" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Born & Date of Birth-->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<Form.Field {form} name="birthCity">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.consent.birth_city}<span class="form-required">*</span></Form.Label>
					<Input {...props} bind:value={$formData.birthCity} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="birthDate">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						>{i18n.t.consent.birth_date}
						{i18n.t.consent.birth_date_sugg}<span class="form-required">*</span></Form.Label
					>
					<Input {...props} bind:value={$formData.birthDate} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Resident: City Address -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr]">
		<Form.Field {form} name="addressResidence">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						>{i18n.t.consent.resident_address}<span class="form-required">*</span></Form.Label
					>
					<Input {...props} bind:value={$formData.addressResidence} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="cityResidence">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.consent.resident_city}<span class="form-required">*</span></Form.Label
					>
					<Input {...props} bind:value={$formData.cityResidence} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Field {form} name="taxId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{i18n.t.consent.tax_id}<span class="form-required">*</span></Form.Label>
				<Input {...props} bind:value={$formData.taxId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Email/Phone-->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.email}<span class="form-required">*</span></Form.Label>
					<Input {...props} type="email" bind:value={$formData.email} class="h-10" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="phone">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{i18n.t.contact.phone}<span class="form-required">*</span></Form.Label>
					<Input {...props} bind:value={$formData.phone} class="h-10" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Field {form} name="signature">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex flex-col gap-4">
					<div class="flex items-end justify-between">
						<Form.Label
							>{i18n.t.consent.label_signature}<span class="form-required">*</span></Form.Label
						>

						<Button
							onclick={handleSwitchMethod}
							variant="ghost"
							class="cursor-pointer text-xs text-primary underline underline-offset-3 transition-colors hover:text-brand hover:decoration-2"
						>
							{signatureMethod === 'draw' ? i18n.t.consent.type_sig : i18n.t.consent.draw_sig}
						</Button>
					</div>

					{#if signatureMethod === 'draw'}
						<div class="overflow-hidden rounded-2xl border border-dashed border-primary bg-white">
							<canvas
								bind:this={canvasElement}
								class="h-48 w-full cursor-crosshair touch-none"
								aria-label={i18n.t.a11y.sig_canvas}
							></canvas>
						</div>
						<p class="text-[12px] text-foreground/90 italic">
							{i18n.t.consent.draw_sig_info}.
						</p>
						<Button
							variant="ghost"
							onclick={clearSignature}
							class="cursor-pointer text-[10px] uppercase"
						>
							{i18n.t.consent.delete_sig}
						</Button>
					{:else}
						<div class="space-y-2">
							<Input
								bind:value={$formData.typedSignature}
								placeholder={i18n.t.consent.type_sig_full_name}
								class="h-11 font-serif text-xl italic"
							/>
							<p class="text-[10px] text-foreground">
								{i18n.t.consent.type_sig_disclaimer}
							</p>
						</div>
					{/if}

					<input type="hidden" name={props.name} bind:value={$formData.signature} />
					<input type="hidden" name="typedSignature" bind:value={$formData.typedSignature} />
					<input type="hidden" name="signatureType" bind:value={$formData.signatureType} />
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field
		{form}
		name="isRead"
		class="flex items-start space-y-0 space-x-3 rounded-md border border-border bg-white p-4"
	>
		<Form.Control>
			{#snippet children({ props })}
				<Checkbox {...props} bind:checked={$formData.isRead} />
				<div class="space-y-1 leading-none">
					<Form.Label>{i18n.t.consent.read_consent}</Form.Label>
					<p class="text-xs text-foreground italic">
						<button
							type="button"
							onclick={() => (isDialogOpen = true)}
							class="cursor-pointer text-primary underline underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
						>
							{i18n.t.consent.view_consent}
						</button>
					</p>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={$delayed} size="form" class="w-full cursor-pointer">
		{#if $delayed}
			{i18n.t.contact.sending}
		{:else}
			{i18n.t.consent.submit}
		{/if}
	</Form.Button>
</form>
