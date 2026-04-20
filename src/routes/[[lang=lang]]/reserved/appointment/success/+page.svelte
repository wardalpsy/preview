<script lang="ts">
	import { onMount } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { Button } from '$lib/components/ui/button';
	//Icons
	import IconCheck from 'virtual:icons/tabler/circle-check';
	import IconLoader from 'virtual:icons/tabler/loader-2';
	import IconMail from 'virtual:icons/tabler/mail';
	import IconCalendar from 'virtual:icons/tabler/calendar-event';
	import IconError from 'virtual:icons/tabler/face-id-error';

	let status = $state<'loading' | 'success' | 'error'>('loading');
	let bookingData = $state<any>(null);

	onMount(async () => {
		const stored = localStorage.getItem('pending_booking');
		if (!stored) {
			status = 'error';
			return;
		}

		try {
			bookingData = JSON.parse(stored);

			// Call fulfillment API
			const res = await fetch('/api/fulfillment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bookingData)
			});

			if (res.ok) {
				status = 'success';
				// Clean up
				localStorage.removeItem('pending_booking');
			} else {
				console.error('Fulfillment failed');
				status = 'success'; // Still show success to user, but log error
			}
		} catch (e) {
			console.error('Error in success page:', e);
			status = 'error';
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-background px-6 py-20">
	<div class="w-full max-w-md text-center">
		{#if status === 'loading'}
			<div class="animate-in space-y-6 fade-in">
				<IconLoader class="mx-auto size-16 animate-spin text-brand" aria-hidden="true" />
				<h1 class="text-2xl text-brand">{i18n.t.fulfillment.confirming}</h1>
				<p class="text-foreground/90">
					{i18n.t.fulfillment.process_appointment}
				</p>
			</div>
		{:else if status === 'success'}
			<div class="animate-in space-y-8 duration-500 zoom-in">
				<div class="bg-wprimary/5 mx-auto flex h-24 w-24 items-center justify-center rounded-full">
					<IconCheck class="size-12 text-primary" aria-hidden="true" />
				</div>

				<div class="space-y-4">
					<h1 class="font-serif text-4xl text-brand">
						{i18n.t.consent.thanks}, {bookingData?.patient?.firstName}!
					</h1>
					<p class="text-lg text-foreground">{i18n.t.fulfillment.confirmed_appointment}</p>
				</div>

				<div class="space-y-6 rounded-3xl border bg-white p-8 text-left shadow-md shadow-brand/15">
					<div class="flex items-start gap-4">
						<div class="rounded-2xl bg-primary/10 p-3 text-primary">
							<IconCalendar class="size-6" aria-hidden="true" />
						</div>
						<div>
							<p class="text-xs font-bold tracking-widest text-foreground/90 uppercase">
								{i18n.t.fulfillment.appointment}
							</p>
							<p class="font-bold text-foreground first-letter:uppercase">
								{new Date(bookingData?.slot?.start || bookingData?.slot?.time).toLocaleString(
									i18n.currentLang === 'it' ? 'it-IT' : i18n.currentLang === 'pl' ? 'pl-PL' : 'en-US',
									{
										weekday: 'long',
										day: 'numeric',
										month: 'long',
										hour: '2-digit',
										minute: '2-digit'
									}
								)}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="rounded-2xl bg-primary/10 p-3 text-primary">
							<IconMail class="size-6" aria-hidden="true" />
						</div>
						<div>
							<p class="text-xs font-bold tracking-widest text-foreground/90 uppercase">
								{i18n.t.fulfillment.send_docs_heading}
							</p>
							<p class="text-sm text-foreground">
								{i18n.t.fulfillment.send_docs} <strong>{bookingData?.patient?.email}</strong>.
							</p>
						</div>
					</div>
				</div>

				<Button href="/" variant="secondary" size="lg" class="cursor-pointer">
					{i18n.t.a11y.back_home}
				</Button>
			</div>
		{:else}
			<div class="space-y-6">
				<div
					class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/5 text-destructive"
				>
					<IconError class="size-12" />
				</div>
				<h1 class="text-2xl text-brand">{i18n.t.fulfillment.error_msg}</h1>
				<p class="text-foreground">
					{i18n.t.fulfillment.error_info}
				</p>
				<Button href="/reserved/appointment" variant="secondary" size="lg" class="px-10"
					>{i18n.t.fulfillment.retry}</Button
				>
			</div>
		{/if}
	</div>
</div>
