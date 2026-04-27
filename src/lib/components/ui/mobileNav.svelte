<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import LangSwitch from '$lib/components/ui/languageSwitcher.svelte';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/ui/icons/logo.svelte';

	// Icons
	import IconMenu from 'virtual:icons/tabler/menu';

	interface NavItem {
		id: string;
		href: string;
		label: string;
	}

	let {
		navItems,
		topBarVisible,
		l
	}: {
		navItems: NavItem[];
		topBarVisible: boolean;
		l: (path: string) => string;
	} = $props();

	let isMenuOpen = $state(false);
</script>

<nav class="flex w-full items-center justify-between px-4">
	<Sheet.Root bind:open={isMenuOpen}>
		<Sheet.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="icon" size="icon" aria-label={i18n.t.a11y.open_menu}>
					<IconMenu class="size-5" aria-hidden="true" />
					<span class="sr-only">{i18n.t.a11y.toggle_menu}</span>
				</Button>
			{/snippet}
		</Sheet.Trigger>
		<!-- Ghost brand that fades in when top bar scrolls out -->
		<a
			href={l('/')}
			class="flex shrink-0 items-baseline transition-all duration-300"
			class:opacity-0={topBarVisible}
			class:translate-y-2={topBarVisible}
			class:pointer-events-none={topBarVisible}
		>
			<span class="font-serif text-sm leading-tight">{i18n.t.header.title}</span>&nbsp;
			<span class="font-display text-xl leading-tight font-bold tracking-tight text-brand">
				{i18n.t.header.name}
			</span>
		</a>
		<Sheet.Content
			side="right"
			class="flex h-dvh w-80 flex-col justify-between bg-[#f6f2f4] p-0 sm:w-100"
			data-lenis-prevent
		>
			<!-- Top Section: Visual Branding -->
			<div class="flex items-center border-b bg-background p-4">
				<div class="relative z-0 translate-x-6 -translate-y-1.5 sm:translate-x-6.5">
					<Logo />
				</div>
				<div class="mt-4 flex flex-col">
					<span class="font-serif text-sm">{i18n.t.header.title}</span>
					<span class="font-display text-xl font-bold tracking-tight text-brand">
						{i18n.t.header.name}
					</span>
				</div>
			</div>

			<!-- Navigation Section -->
			<nav class="flex grow flex-col px-8 pt-6 text-on-secondary">
				<ul class="space-y-6">
					{#each navItems as item (item.id)}
						<li>
							{#if item.id === 'contact'}
								<a
									href={l(item.href)}
									onclick={() => (isMenuOpen = false)}
									class="mt-12 block rounded-full bg-primary py-3 text-center font-bold text-on-primary transition-all hover:bg-primary-container hover:text-on-primary-container hover:shadow-xl focus:ring-4 focus:ring-ring active:scale-95"
								>
									{item.label}
								</a>
							{:else}
								<a
									href={l(item.href)}
									onclick={() => (isMenuOpen = false)}
									class="group flex items-center font-serif text-lg tracking-tight transition-colors hover:text-brand"
								>
									<span
										class="h-px w-0 bg-brand transition-all duration-300 group-hover:mr-3 group-hover:w-4"
									></span>
									{item.label}
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Footer -->
			<div class="mt-auto px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center">
				<span
					class="block text-[10px] leading-normal font-medium tracking-[0.2em] uppercase opacity-80"
				>
					{i18n.t.header.specialties}
				</span>
			</div>
		</Sheet.Content>
	</Sheet.Root>

	<LangSwitch />
</nav>
