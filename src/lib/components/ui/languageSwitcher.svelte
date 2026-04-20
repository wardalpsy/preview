<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { i18n } from '$lib/i18n.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	//Icons
	import IconWorld from 'virtual:icons/tabler/world';
	import UK from '$lib/components/ui/icons/united-kingdom.svelte';
	import Italia from '$lib/components/ui/icons/italia.svelte';
	import Poland from '$lib/components/ui/icons/poland.svelte';
	const languages = [
		{ code: 'it', label: i18n.t.lang_switch.label_IT },
		{ code: 'pl', label: i18n.t.lang_switch.label_PL },
		{ code: 'en', label: i18n.t.lang_switch.label_EN }
	];

	let currentLangObj = $derived(languages.find((l) => l.code === i18n.currentLang));
	let otherLanguages = $derived(languages.filter((l) => l.code !== i18n.currentLang));

	function handleSwitch(newLang: string) {
		localStorage.setItem('preferred-lang', newLang);
		const pathname = window.location.pathname;
		const segments = pathname.replace(base, '').split('/').filter(Boolean);
		const otherLocales = ['it', 'pl'];

		if (otherLocales.includes(segments[0])) {
			if (newLang === 'en') {
				segments.shift();
			} else {
				segments[0] = newLang;
			}
		} else {
			if (newLang !== 'en') {
				segments.unshift(newLang);
			}
		}

		const newPath = `${base}/${segments.join('/')}`;
		goto(newPath);
	}
</script>

<!-- Flag Snippet -->
{#snippet flag(code: string)}
	{#if code === 'en'}
		<UK />
	{:else if code === 'it'}
		<Italia />
	{:else if code === 'pl'}
		<Poland />
	{/if}
{/snippet}

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="group text-secondary-foreground flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-secondary px-1.5 py-1.5 font-bold text-on-secondary transition-all hover:bg-white/50 hover:text-brand hover:shadow-md focus:ring-4 focus:ring-ring lg:rounded-lg lg:border-border lg:bg-secondary lg:px-3 lg:py-1.5 lg:hover:bg-secondary/50"
		aria-label="Change language. Current language: {currentLangObj?.label}"
	>
		<IconWorld class="size-5 group-hover:text-brand" aria-hidden="true" />
		<span
			class="hidden text-sm font-bold uppercase group-hover:text-brand lg:block"
			aria-hidden="true"
		>
			{i18n.currentLang}
		</span>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content align="end" class="z-50 min-w-30 rounded-xl border bg-white p-1 shadow-xl">
		{#each otherLanguages as lang (lang.code)}
			<DropdownMenu.Item
				onclick={() => handleSwitch(lang.code)}
				class="group my-0.5 flex w-full cursor-pointer items-center rounded-lg border border-transparent px-3 py-2 text-left text-sm transition-colors duration-300 hover:border-brand/30 hover:bg-background"
				lang={lang.code}
				aria-label="Switch to {lang.label}"
			>
				{#if i18n.t.lang_switch.flags}
					<div class="mr-3 flex shrink-0 items-center justify-center rounded-full p-0">
						{@render flag(lang.code)}
					</div>
				{/if}
				<span class="font-medium">{lang.label}</span>
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
