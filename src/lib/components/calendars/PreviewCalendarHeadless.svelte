<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import * as CalendarUI from '$lib/components/ui/calendar/index.js';
	import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import { i18n } from '$lib/i18n.svelte';

	interface Selection {
		date: string;
		time: string;
		italyTime: string;
		userTz: string;
	}

	let { onSelect } = $props<{ onSelect: (selection: Selection) => void }>();

	// State
	let value = $state<CalendarDate | undefined>(today(getLocalTimeZone()));
	let placeholder = $state<CalendarDate>(today(getLocalTimeZone()));
	let selectedTime = $state<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let slots = $state<Record<string, any[]>>({});
	let isLoading = $state(false);
	let proceedButton = $state<HTMLButtonElement | null>(null);

	// Constants & Helpers
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const localeMap: Record<string, string> = { en: 'en-US', it: 'it-IT', pl: 'pl-PL' };

	// Derived state
	const currentLocale = $derived(localeMap[i18n.currentLang] || 'en-US');

	// Memoized formatters for performance (created once per locale change)
	const timeFormatter = $derived(
		new Intl.DateTimeFormat(currentLocale, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})
	);

	const dateFormatter = $derived(
		new Intl.DateTimeFormat(currentLocale, {
			weekday: 'long',
			day: 'numeric',
			month: 'short'
		})
	);

	const italyTimeFormatter = new Intl.DateTimeFormat('it-IT', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Europe/Rome'
	});

	const availableDatesSet = $derived(new Set(Object.keys(slots)));

	const currentDaySlots = $derived.by(() => {
		if (!value) return [];
		return slots[value.toString()] || [];
	});

	// Actions
	async function fetchSlots(date: CalendarDate) {
		isLoading = true;
		const monthStr = `${date.year}-${date.month.toString().padStart(2, '0')}`;

		try {
			const res = await fetch(`/api/cal/slots?month=${monthStr}&timeZone=${userTimeZone}`);
			if (res.ok) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const result = (await res.json()) as any;
				let rawSlots = result.data?.slots || result.data || result.slots || result;

				// Clean the data: remove status and ensure we have an object
				if (rawSlots && typeof rawSlots === 'object') {
					const cleanSlots = { ...rawSlots };
					delete cleanSlots.status;
					slots = cleanSlots;
				}
			}
		} catch (err) {
			console.error('Failed to fetch slots:', err);
		} finally {
			isLoading = false;
		}
	}

	function handleSelection() {
		if (!value || !selectedTime) return;

		const dateObj = value.toDate(getLocalTimeZone());
		const timeObj = new Date(selectedTime);

		onSelect({
			date: dateFormatter.format(dateObj),
			time: timeFormatter.format(timeObj),
			italyTime: italyTimeFormatter.format(timeObj),
			userTz: userTimeZone
		});
	}

	// Effects
	$effect(() => {
		if (placeholder) fetchSlots(placeholder);
	});

	$effect(() => {
		if (selectedTime && proceedButton) {
			proceedButton.focus();
		}
	});

	// Helpers
	const isDateAvailable = (date: DateValue) => availableDatesSet.has(date.toString());
</script>

{#snippet daySnippet({ day, outsideMonth }: { day: DateValue; outsideMonth: boolean })}
	<div class="relative flex h-full w-full flex-col items-center justify-center">
		<CalendarUI.Day />
		{#if !outsideMonth && isDateAvailable(day)}
			<div class="absolute bottom-1 z-10 h-1.5 w-1.5 rounded-full bg-primary"></div>
		{/if}
	</div>
{/snippet}

<Card.Root class="overflow-hidden border-none bg-white shadow-none">
	<Card.Content class="relative flex w-full flex-col p-0 md:flex-row md:pe-48">
		<div class="flex w-full flex-col items-center justify-center p-6">
			<Calendar
				type="single"
				bind:value
				bind:placeholder
				day={daySnippet}
				class="p-0 [--cell-size:--spacing(10)] **:data-outside-month:invisible md:[--cell-size:--spacing(12)]"
				weekdayFormat="long"
				locale={currentLocale}
			/>
			<div class="mt-4 w-fit px-2 text-left">
				<p class="text-[10px] tracking-widest text-foreground uppercase">
					{i18n.t.cal.timezone} <span class="font-medium text-brand">{userTimeZone}</span>
				</p>
			</div>
		</div>

		<div
			class="no-scrollbar flex max-h-72 w-full flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:inset-y-0 md:inset-e-0 md:max-h-none md:w-48 md:border-s md:border-t-0"
		>
			<h3 class="text-xs font-bold tracking-widest text-foreground/90 uppercase">
				{i18n.t.cal.slots}
			</h3>
			<div class="grid gap-2">
				{#if isLoading}
					<div
						class="flex h-20 items-center justify-center"
						role="status"
						aria-label={i18n.t.cal.loading_slots || 'Loading slots'}
					>
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent"
						></div>
					</div>
				{:else if !value}
					<p class="py-4 text-center text-xs text-foreground/90 italic">
						{i18n.t.cal.select_day}
					</p>
				{:else if currentDaySlots.length > 0}
					{#each currentDaySlots as slot (slot.start || slot.time)}
						{@const slotStart = slot.start || slot.time}
						{@const slotEnd = slot.end}
						{@const startStr = slotStart ? timeFormatter.format(new Date(slotStart)) : '??:??'}
						{@const endStr = slotEnd ? timeFormatter.format(new Date(slotEnd)) : ''}

						<Button
							variant={selectedTime === slotStart ? 'secondary-slot' : 'outline-slot'}
							onclick={() => (selectedTime = slotStart)}
							class="w-full text-xs shadow-none"
							aria-pressed={selectedTime === slotStart}
						>
							{startStr}
							{#if endStr}
								{i18n.t.cal.slots_separator || '-'} {endStr}
							{/if}
						</Button>
					{/each}
				{:else}
					<p class="py-4 text-center text-xs text-foreground/90 italic">
						{i18n.t.cal.no_slots}
					</p>
				{/if}
			</div>
		</div>
	</Card.Content>

	<Card.Footer
		class="flex flex-col gap-4 border-t bg-secondary/80 px-6 py-5! text-left md:flex-row"
	>
		<div class="text-sm" aria-live="polite">
			{#if value && selectedTime}
				{i18n.t.cal.slot_request}
				<span class="font-medium text-brand">
					{dateFormatter.format(value.toDate(getLocalTimeZone()))}
				</span>
				{i18n.t.cal.time_preposition}
				<span class="font-medium text-brand">
					{timeFormatter.format(new Date(selectedTime))}
				</span>.
			{:else}
				{i18n.t.cal.slot_select}
			{/if}
		</div>
		<Button
			bind:ref={proceedButton}
			disabled={!value || !selectedTime}
			onclick={handleSelection}
			variant="default"
			size="lg"
			class="cursor-pointer md:ms-auto"
		>
			{i18n.t.cal.proceed}
		</Button>
	</Card.Footer>
</Card.Root>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
