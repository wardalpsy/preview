<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { base } from '$app/paths';
	import { cn } from '$lib/utils.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};

	const navOrder: (keyof typeof i18n.t.nav)[] = ['about', 'approach', 'practices', 'contact'];
	const navOrderCollapsed: (keyof typeof i18n.t.nav)[] = [
		'articles',
		'testimonials',
		'faq',
		'reserved'
	];

	let navItems = $derived(
		navOrder
			.filter((id) => i18n.t.nav[id]) // Only show if translation exists
			.map((id) => ({
				id,
				href: id === 'about' ? '/#about' : `/#${id}`,
				label: i18n.t.nav[id]
			}))
	);

	let collapsedNavItems = $derived(
		navOrderCollapsed
			.filter((id) => i18n.t.nav[id]) // Only show if translation exists
			.map((id) => ({
				id,
				href: `/${id}`,
				label: i18n.t.nav[id]
			}))
	);
</script>

<NavigationMenu.Root viewport={false}>
	<NavigationMenu.List>
		{#each navItems as item (item.id)}
			<NavigationMenu.Item>
				<NavigationMenu.Link
					href={l(item.href)}
					class={cn(navigationMenuTriggerStyle(), 'header-nav_link whitespace-nowrap')}
				>
					{item.label}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		{/each}

		{#if collapsedNavItems.length > 0}
			<NavigationMenu.Item>
				<NavigationMenu.Trigger class={navigationMenuTriggerStyle()}>More</NavigationMenu.Trigger>
				<NavigationMenu.Content class="absolute top-full right-0 mt-2 min-w-[200px] rounded-md border bg-popover p-2 shadow-md">
					<ul class="flex flex-col gap-1">
						{#each collapsedNavItems as item (item.id)}
							<li class="list-none">
								<NavigationMenu.Link
									href={l(item.href)}
									class="block w-full select-none rounded-sm p-2 text-sm no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
								>
									{item.label}
								</NavigationMenu.Link>
							</li>
						{/each}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
		{/if}
	</NavigationMenu.List>
</NavigationMenu.Root>
