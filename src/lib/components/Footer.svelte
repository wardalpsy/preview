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
		<div class="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
			<!-- Brand & Mission -->
			<div class=" space-y-6">
				<div class="mt-4 flex flex-col">
					<div>
						<span class="font-serif text-sm">{i18n.t.header.title}</span>
						<span class="font-display text-xl font-bold tracking-tight text-brand">
							{i18n.t.header.name}
						</span>
					</div>
					<span class="text-xs tracking-tight text-foreground uppercase">
						{i18n.t.footer.specialties}
					</span>
				</div>
				<ul class="space-y-1.5 text-sm leading-relaxed text-foreground/90">
					<li>
						{i18n.t.footer.register}
						<a
							href="https://www.psicologipuglia.it/single-professionista/?id=7134"
							class="footer-legal_link"
							target="_blank"
							rel="noopener"
							>{i18n.t.footer.register_no}<span class="sr-only">{i18n.t.a11y.external_link}</span
							></a
						>
					</li>
					{#if i18n.t.footer.specialization}
						<li>
							<p class="leading-relaxed whitespace-pre-line">
								{i18n.t.footer.specialization}
							</p>
						</li>
					{/if}
					{#if i18n.t.footer.member}
						<li>
							<p class="leading-relaxed whitespace-pre-line">
								{i18n.t.footer.member}
							</p>
						</li>
					{/if}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h2 class="footer-headings">
					{i18n.t.footer.contact_title}
				</h2>
				<SocialLinks />
			</div>

			<!-- Navigation -->
			<div>
				<h2 class="footer-headings">{i18n.t.footer.quick_links}</h2>
				<ul class="space-y-4 text-sm">
					<li>
						<a href={l('/availability')} class="footer-nav_link">{i18n.t.footer.nav_availability}</a
						>
					</li>
					<li>
						<a href={l('/reserved')} class="footer-nav_link">{i18n.t.footer.nav_reserved}</a>
					</li>
					<li>
						<a href={l('/articles')} class="footer-nav_link">{i18n.t.nav.articles}</a>
					</li>
					<li>
						<a href="#contact" class="footer-nav_link">{i18n.t.nav.contact}</a>
					</li>
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<h2 class="footer-headings">
					{i18n.t.footer.legal_title}
				</h2>
				<ul class="space-y-4 text-xs leading-relaxed">
					<li>{i18n.t.footer.vat}</li>
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
			{#if i18n.t.footer.oxy_credit}
				<!-- Tiny Creator Credit -->
				<a
					href="https://oxypteros.com"
					target="_blank"
					class="font-serif text-xs hover:text-black hover:underline"
					rel="noopener"
					title="Designed & built by Oxypteros"
					aria-label={`Designed & built by Oxypteros ${i18n.t.a11y.external_link}`}>π</a
				>
			{/if}
		</div>
	</div>
</footer>
