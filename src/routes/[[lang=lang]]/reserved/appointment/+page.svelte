<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import ConsentForm from '$lib/components/forms/ConsentForm.svelte';
	import BookingCalendarHeadless from '$lib/components/calendars/CalendarHeadless.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	//Icons
	import IconArrowLeft from 'virtual:icons/tabler/arrow-left';

	let { data }: { data: PageData } = $props();

	// Steps: 1 (Slot), 2 (Consent), 3 (Summary/Confirm)
	let step = $state(1);
	let selectedSlot = $state<any>(null);
	let patientData = $state<{
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
	} | null>(null);
	let isBooking = $state(false);

	function handleSlotSelected(slot: any) {
		selectedSlot = slot;
		step = 2;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function handleConsentComplete(formData: any) {
		patientData = formData;
		step = 3;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function handleFinalBooking() {
		if (!selectedSlot || !patientData) return;
		isBooking = true;

		try {
			// Create the booking on Cal.com
			const res = await fetch('/api/cal/booking', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					start: selectedSlot.rawSlot?.start || selectedSlot.rawSlot?.time,
					lang: i18n.currentLang,
					attendee: {
						name: `${patientData.firstName} ${patientData.lastName}`,
						email: patientData.email,
						timeZone: selectedSlot.userTz
					}
				})
			});

			const result = (await res.json()) as any;

			if (res.ok && result.checkoutUrl) {
				// Store consent data in localStorage to retrieve it on the success page
				const bookingData = {
					patient: patientData,
					slot: selectedSlot.rawSlot,
					bookingId: result.bookingUid,
					lang: i18n.currentLang
				};
				localStorage.setItem('pending_booking', JSON.stringify(bookingData));

				// Redirect to Stripe Checkout
				window.location.href = result.checkoutUrl;
			} else {
				console.error('Booking failed:', result);
				alert('Errore durante la prenotazione. Riprova.');
			}
		} catch (err) {
			console.error('Booking error:', err);
			alert('Si è verificato un errore.');
		} finally {
			isBooking = false;
		}
	}

	const steps = [
		{ id: 1, label: i18n.t.consent.badge_step1 || 'Availability' },
		{ id: 2, label: i18n.t.consent.badge_step2 || 'Consent' },
		{ id: 3, label: i18n.t.consent.badge_step3 || 'Payment' }
	];

	let headingRef = $state<HTMLElement | null>(null);

	// Move focus to the heading when the step changes for screen readers
	$effect(() => {
		if (step && headingRef) {
			headingRef.focus();
		}
	});

	const pageTitle = $derived(`${steps.find((s) => s.id === step)?.label} - ${i18n.t.seo.title}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="min-h-screen bg-background py-20">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-4xl space-y-12">
			<!-- Progress Bar -->
			<nav aria-label="Progress" class="px-4 md:px-20">
				<ol class="flex items-center justify-between">
					{#each steps as s, i (s.id)}
						<li class="flex flex-col items-center gap-2">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors {step >=
								s.id
									? 'bg-primary text-on-primary'
									: 'bg-secondary text-on-secondary'}"
								aria-hidden="true"
							>
								{s.id}
							</div>
							<span
								class="text-[10px] font-bold tracking-widest uppercase transition-colors {step >=
								s.id
									? 'text-brand'
									: 'text-foreground/90'}"
								aria-current={step === s.id ? 'step' : undefined}
							>
								{s.label}
							</span>
						</li>
						{#if i < steps.length - 1}
							<div class="mx-4 mb-6 h-px grow bg-border" aria-hidden="true"></div>
						{/if}
					{/each}
				</ol>
			</nav>

			{#if step === 1}
				<div class="my-16 animate-in duration-500 fade-in slide-in-from-bottom-4">
					<h1
						bind:this={headingRef}
						tabindex="-1"
						class="mb-8 text-center font-display text-3xl text-brand outline-none"
					>
						{i18n.t.consent.calendar_title || 'Appointment & Payment Calendar'}
					</h1>
					<BookingCalendarHeadless mode="select" onSelect={handleSlotSelected} />
				</div>
			{:else if step === 2}
				<div class="my-16 animate-in duration-500 fade-in slide-in-from-bottom-4">
					<div class="mb-8 flex flex-col gap-4">
						<Button
							variant="ghost"
							size="lg"
							onclick={() => (step = 1)}
							class="group w-fit cursor-pointer"
						>
							<IconArrowLeft
								class="transition-transform group-hover:-translate-x-2"
								aria-hidden="true"
							/>
							{i18n.t.a11y.back}
						</Button>
						<h1
							bind:this={headingRef}
							tabindex="-1"
							class="mb-8 text-center font-display text-3xl text-brand outline-none"
						>
							{i18n.t.consent.legal_title || 'Informed Consent for Treatment'}
						</h1>
					</div>
					<ConsentForm
						form={data.form}
						initialData={patientData}
						onComplete={handleConsentComplete}
					/>
				</div>
			{:else if step === 3}
				<div class="my-16 animate-in duration-500 fade-in slide-in-from-bottom-4">
					<Card.Root
						class="overflow-hidden rounded-[2rem] border bg-secondary text-on-secondary shadow-md shadow-brand/15"
					>
						<Card.Header class="p-8">
							<h1
								bind:this={headingRef}
								tabindex="-1"
								class="mb-8 text-center font-display text-3xl text-brand outline-none"
							>
								{i18n.t.consent.appointment_overview}
							</h1>
						</Card.Header>
						<Card.Content class="space-y-6 p-8">
							<div class="grid grid-cols-1 gap-8">
								<div class="space-y-4">
									<h2 class="text-xs font-bold tracking-widest text-foreground/90 uppercase">
										{i18n.t.consent.appointment_details}
									</h2>
									<div class="rounded-2xl border bg-background p-6">
										<p class="text-wardal-purple font-serif text-lg">
											{selectedSlot?.date}
										</p>
										<p class="font-bold">
											{i18n.t.cal.time_preposition}
											{selectedSlot?.time}
										</p>
									</div>
								</div>
								<div class="space-y-4">
									<h2 class="text-xs font-bold tracking-widest text-foreground/90 uppercase">
										{i18n.t.consent.label_data}
									</h2>
									<div class="rounded-2xl border bg-white p-6">
										<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
											<div class="space-y-1">
												<p class="text-[10px] font-bold text-foreground/60 uppercase">
													{i18n.t.contact.section_name}
												</p>
												<p class="font-bold">
													{patientData?.firstName}
													{patientData?.lastName}
												</p>
											</div>
											<div class="space-y-1">
												<p class="text-[10px] font-bold text-foreground/60 uppercase">
													{i18n.t.contact.email}
												</p>
												<p>{patientData?.email}</p>
											</div>
											<div class="space-y-1">
												<p class="text-[10px] font-bold text-foreground/60 uppercase">
													{i18n.t.contact.phone}
												</p>
												<p>{patientData?.phone}</p>
											</div>
											<div class="space-y-1">
												<p class="text-[10px] font-bold text-foreground/60 uppercase">
													{i18n.t.consent.tax_id}
												</p>
												<p>{patientData?.taxId}</p>
											</div>
											<div class="space-y-1">
												<p class="text-[10px] font-bold text-foreground/60 uppercase">
													{i18n.t.consent.birth_city} / {i18n.t.consent.birth_date}
												</p>
												<p>{patientData?.birthCity}, {patientData?.birthDate}</p>
											</div>
											<div class="space-y-1">
												<p class="text-[10px] font-bold text-foreground/60 uppercase">
													{i18n.t.consent.resident_address}
												</p>
												<p>{patientData?.addressResidence}, {patientData?.cityResidence}</p>
											</div>
										</div>

										<div class="mt-6 border-t border-border/50 pt-4">
											<p class="mb-2 text-[10px] font-bold text-foreground/90 uppercase">
												{i18n.t.consent.signature}
											</p>
											{#if patientData?.signatureType === 'draw'}
												<img
													src={patientData?.signature}
													alt="Your Signature"
													class="h-12 object-contain"
												/>
											{:else}
												<p class="font-serif text-xl italic">{patientData?.typedSignature}</p>
											{/if}
										</div>
									</div>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex flex-col gap-4 border-t bg-background p-8 md:flex-row">
							<Button
								variant="secondary"
								size="lg"
								onclick={() => (step = 2)}
								disabled={isBooking}
								class="w-full cursor-pointer md:w-auto"
							>
								{i18n.t.consent.edit_details}
							</Button>
							<Button
								onclick={handleFinalBooking}
								disabled={isBooking}
								variant="default"
								size="xl"
								class="w-full cursor-pointer md:ms-auto md:w-auto"
							>
								{#if isBooking}
									<div
										class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
									></div>
								{/if}
								{i18n.t.consent.proceed_payment}
							</Button>
						</Card.Footer>
					</Card.Root>
				</div>
			{/if}
		</div>
	</div>
</div>
