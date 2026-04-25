<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import LangSwitch from '$lib/components/ui/languageSwitcher.svelte';
	import { base } from '$app/paths';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button';
	//Icons
	import IconMenu from 'virtual:icons/tabler/menu';

	import Logo from '$lib/components/ui/icons/logo.svelte';
	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};

	let topBarVisible = $state(true);
	let topBarRef: HTMLElement | null = $state(null);
	let isMenuOpen = $state(false);

	// Intersection Observer logic remains the same
	$effect(() => {
		if (!topBarRef) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				topBarVisible = entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		observer.observe(topBarRef);
		return () => observer.disconnect();
	});
	// Define the manual order of navigation items
	const navOrder: (keyof typeof i18n.t.nav)[] = [
		'about',
		'approach',
		'practices',
		'articles',
		'testimonials',
		'faq',
		'contact'
	];

	// Helper for the nav items to be dynamic based on the manual order
	let navItems = $derived(
		navOrder
			.filter((id) => i18n.t.nav[id]) // Only show if translation exists
			.map((id) => ({
				id,
				href: id === 'about' ? '/#about' : `/#${id}`,
				label: i18n.t.nav[id]
			}))
	);
</script>

<header bind:this={topBarRef}>
	<div class="border-b border-border pt-4 pb-4">
		<div class="container mx-auto flex items-center justify-between px-4">
			<!-- Brand Identity -->
			<div class="flex items-center justify-center">
				<div class="relative z-0 translate-x-4.5 -translate-y-2.5 sm:translate-x-6.5">
					<Logo />
				</div>
				<a href={l('/')} class="group relative z-10 flex items-center">
					<div class="flex flex-col">
						<div>
							<span class="font-serif text-base leading-tight md:text-lg"
								>{i18n.t.header.title}</span
							>&nbsp;
							<span
								class="font-display text-xl leading-tight font-bold tracking-tight text-brand md:text-3xl"
							>
								{i18n.t.header.name}
							</span>
						</div>
						<span class="pt-0.5 text-[9px] font-medium tracking-[0.2em] uppercase md:text-[10px]">
							{i18n.t.header.specialties}
						</span>
					</div>
				</a>
			</div>

			<div class="hidden lg:block">
				<LangSwitch />
			</div>
		</div>
	</div>
</header>

<!-- Sticky bottom bar -->
<div
	class="sticky top-0 z-50 w-full bg-secondary/90 py-1 shadow-sm backdrop-blur-lg lg:mb-0 lg:flex lg:py-3"
>
	<div class="container mx-auto flex w-full items-center justify-between lg:hidden">
		<!-- Mobile Nav -->
		<nav class="flex w-full items-center justify-between px-4 lg:hidden">
			<Sheet.Root bind:open={isMenuOpen}>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="icon" size="icon" aria-label={i18n.t.a11y.open_menu}>
							<IconMenu class="size-5" aria-hidden="true" />
							<span class="sr-only">{i18n.t.a11y.toggle_menu}</span>
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="flex w-75 flex-col bg-[#f6f2f4]  p-0 sm:w-100">
					<!-- Top Section: Visual Branding -->
					<div class="flex items-center gap-4 border-b bg-background p-6">
						<Logo />
						<div class="mt-4 flex flex-col">
							<span class="font-serif text-sm">{i18n.t.header.title}</span>
							<span class="font-display text-xl font-bold tracking-tight text-brand">
								{i18n.t.header.name}
							</span>
						</div>
					</div>
					<!-- Navigation Section -->
					<nav class="flex flex-col bg-secondary px-8 py-10 text-on-secondary">
						<ul class="space-y-6">
							{#each navItems as item (item.id)}
								<li>
									{#if item.id === 'contact'}
										<!-- Button CTA -->
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
											class="group flex items-center font-serif text-xl tracking-tight transition-colors hover:text-brand"
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

					<!-- Optional Footer -->
					<div class="mt-auto p-8 text-center">
						<span class="text-[10px] font-medium tracking-[0.2em] uppercase">
							{i18n.t.header.specialties}
						</span>
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<LangSwitch />
		</nav>
	</div>

	<div
		class="mx-auto hidden w-full items-center justify-start px-4 lg:flex xl:container xl:justify-end"
	>
		<a
			href={l('/')}
			class="hidden transition-all duration-300 lg:items-baseline xl:flex xl:shrink-0"
			class:opacity-0={topBarVisible}
			class:translate-y-2={topBarVisible}
			class:pointer-events-none={topBarVisible}
		>
			<span class="pl-13 font-serif text-sm leading-tight">{i18n.t.header.title}</span>&nbsp;
			<span class="font-display text-xl leading-tight font-bold tracking-tight text-brand">
				{i18n.t.header.name}
			</span>
		</a>
		<nav class="hidden w-full lg:flex">
			<ul
				class="flex w-full items-center justify-center space-x-10 text-[14px] font-medium tracking-wide xl:justify-end"
			>
				{#each navItems as item (item.id)}
					<li>
						<a href={l(item.href)} class="header-nav_link whitespace-nowrap">{item.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</div>
