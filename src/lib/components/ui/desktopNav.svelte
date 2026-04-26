<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import { i18n } from '$lib/i18n.svelte';

	// Icons
	import IconChevronDown from 'virtual:icons/tabler/chevron-down';

	interface NavItem {
		id: string;
		href: string;
		label: string;
	}

	let {
		navItems,
		collapsedNavItems,
		topBarVisible,
		l
	}: {
		navItems: NavItem[];
		collapsedNavItems: NavItem[];
		topBarVisible: boolean;
		l: (path: string) => string;
	} = $props();
</script>

<div class="flex w-full items-center justify-start">
	<!-- Ghost brand that fades in when top bar scrolls out -->
	<a
		href={l('/')}
		class="flex shrink-0 items-baseline transition-all duration-300"
		class:opacity-0={topBarVisible}
		class:translate-y-2={topBarVisible}
		class:pointer-events-none={topBarVisible}
	>
		<span class="pl-13 font-serif text-sm leading-tight">{i18n.t.header.title}</span>&nbsp;
		<span class="font-display text-xl leading-tight font-bold tracking-tight text-brand">
			{i18n.t.header.name}
		</span>
	</a>

	<nav class="hidden w-full lg:flex lg:py-1">
		<ul
			class="flex w-full items-center justify-center space-x-10 text-[14px] font-medium tracking-wide lg:justify-end"
		>
			{#each navItems as item (item.id)}
				<li>
					<a href={l(item.href)} class="header-nav_link whitespace-nowrap">{item.label}</a>
				</li>
			{/each}

			{#if collapsedNavItems.length > 0}
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class={cn(navigationMenuTriggerStyle(), 'gap-1')}>
							{i18n.t.nav.more}
							<IconChevronDown class="size-3" />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							align="end"
							class="flex min-w-fit flex-col space-y-2 bg-secondary/90 px-4 py-3"
						>
							{#each collapsedNavItems as item (item.id)}
								<DropdownMenu.Item
									class="header-nav_link w-full cursor-pointer rounded-none whitespace-nowrap focus:bg-transparent"
								>
									<a href={l(item.href)} class="w-full">
										{item.label}
									</a>
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</li>
			{/if}
		</ul>
	</nav>
</div>
