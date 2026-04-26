<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import LangSwitch from '$lib/components/ui/languageSwitcher.svelte';
	import { base } from '$app/paths';
	import Logo from '$lib/components/ui/icons/logo.svelte';
	import MobileNav from '$lib/components/ui/mobileNav.svelte';
	import DesktopNav from '$lib/components/ui/desktopNav.svelte';

	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};

	let topBarVisible = $state(true);
	let topBarRef: HTMLElement | null = $state(null);

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

	const navOrder: (keyof typeof i18n.t.nav)[] = [
		'about',
		'approach',
		'practices',
		'sessions',
		'contact'
	];

	const navOrderCollapsed: (keyof typeof i18n.t.nav)[] = [
		'articles',
		'testimonials',
		'faq',
		'reserved'
	];

	let navItems = $derived(
		navOrder
			.filter((id) => i18n.t.nav[id])
			.map((id) => ({
				id,
				href: id === 'about' ? '/#about' : `/#${id}`,
				label: i18n.t.nav[id]
			}))
	);

	let collapsedNavItems = $derived(
		navOrderCollapsed
			.filter((id) => {
				// Filter out articles if disabled in CMS
				if (id === 'articles' && !i18n.t.articles.enabled) return false;
				return !!i18n.t.nav[id];
			})
			.map((id) => ({
				id,
				href: id === 'faq' || id === 'testimonials' ? `/#${id}` : `/${id}`,
				label: i18n.t.nav[id]
			}))
	);

	// Combined list for Mobile Nav so it shows everything, with contact at the very end
	let mobileNavItems = $derived([
		...navItems.filter((item) => item.id !== 'contact'),
		...collapsedNavItems,
		...navItems.filter((item) => item.id === 'contact')
	]);
</script>

<!-- Top identity bar -->
<header bind:this={topBarRef}>
	<div class="border-b border-border pt-4 pb-4">
		<div class="container mx-auto flex items-center justify-between px-4">
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

<!-- Sticky navigation bar -->
<div class="sticky top-0 z-50 w-full bg-secondary/90 py-1 shadow-sm backdrop-blur-lg">
	<div class="container mx-auto">
		<!-- Mobile: Visible until lg -->
		<div class="lg:hidden">
			<MobileNav navItems={mobileNavItems} {topBarVisible} {l} />
		</div>

		<!-- Desktop: Visible from lg up -->
		<div class="hidden lg:flex">
			<DesktopNav {navItems} {collapsedNavItems} {topBarVisible} {l} />
		</div>
	</div>
</div>
