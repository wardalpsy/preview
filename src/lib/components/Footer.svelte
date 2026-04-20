<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import SocialLinks from '$lib/components/ui/socialIcons.svelte';
	import { base } from '$app/paths';
	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		// Ensure path starts with a slash
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
	const startYear = 2026;
	const currentYear = $derived(new Date().getFullYear());
	const displayYear = $derived(
		currentYear === startYear
			? startYear.toString()
			: `${startYear}-${currentYear.toString().slice(-2)}`
	);
</script>

<footer class="border-t-2 border-border bg-white pt-20 pb-10">
	<div class="container mx-auto px-6">
		<div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand & Mission -->
			<div class="space-y-6">
				<div class="mt-4 flex flex-col">
					<span class="font-serif text-sm">{i18n.t.header.title}</span>
					<span class="font-display text-xl font-bold tracking-tight text-brand">
						{i18n.t.header.name}
					</span>
					<p class="mt-2 max-w-xs text-sm leading-relaxed text-foreground/90">
						{i18n.t.footer.description}
					</p>
				</div>
			</div>

			<!-- Navigation -->
			<div>
				<h2 class="footer-headings">{i18n.t.footer.quick_links}</h2>
				<ul class="space-y-4 text-sm">
					<li>
						<a href={l('/about')} class="footer-nav_link">{i18n.t.nav.about}</a>
					</li>
					<li>
						<a href={l('/approach')} class="footer-nav_link">{i18n.t.nav.approach}</a>
					</li>
					<li>
						<a href={l('/booking')} class="footer-nav_link">{i18n.t.nav.articles}</a>
					</li>
					<li>
						<a href="#contact" class="footer-nav_link">{i18n.t.nav.contact}</a>
					</li>
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h2 class="footer-headings">
					{i18n.t.footer.contact_title}
				</h2>

				<SocialLinks />

				<!--<div class="mt-4 flex items-start gap-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-wardal-primary-hover"
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
							d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
						/><path
							d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0"
						/></svg
					>
					<span>{i18n.t.footer.location}</span>
				</div>-->
			</div>

			<!-- Legal -->
			<div>
				<h2 class="footer-headings">
					{i18n.t.footer.legal_title}
				</h2>
				<ul class="space-y-4 text-xs leading-relaxed">
					<li>{i18n.t.footer.vat}</li>
					<li>{i18n.t.footer.register}</li>
					<li>
						<a href={l('/')} class="footer-legal_link">{i18n.t.footer.privacy}</a>
					</li>
					<li>
						<a href={l('/')} class="footer-legal_link">{i18n.t.footer.cookies}</a>
					</li>
					<li>
						<a href={l('/')} class="footer-legal_link">{i18n.t.footer.accessibility}</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="flex flex-wrap items-center justify-between gap-6 border-t border-border/50 pt-10 md:flex-row"
		>
			<small>
				© {displayYear}&nbsp; Dr.&nbsp; {i18n.t.header.name}. &nbsp;{i18n.t.footer.rights}
			</small>

			<!-- Tiny Creator Credit -->
			<a
				href="https://oxypteros.com"
				target="_blank"
				class="font-serif text-xs hover:text-black hover:underline"
				rel="noopener"
				title="Designed & built by Oxypteros"
				aria-label={`Designed & built by Oxypteros ${i18n.t.footer.external_link}`}>π</a
			>
		</div>
	</div>
</footer>
