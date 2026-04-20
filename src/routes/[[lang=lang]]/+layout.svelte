<script lang="ts">
	import '../layout.css';
	import { onMount } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/Seo.svelte';
	import WhatsAppFab from '$lib/components/ui/whatsAppFab.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';

	let { children } = $props();
	$effect(() => {
		document.documentElement.lang = i18n.currentLang;
	});
	//Lenis
	onMount(() => {
		const lenis = new Lenis({
			// 'lerp' is the secret to buttery smoothness (0.05 to 0.1 is the sweet spot)
			lerp: 0.07,
			wheelMultiplier: 1,
			infinite: false,
			gestureOrientation: 'vertical',
			smoothWheel: true
		});

		let rafId: number;

		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
			cancelAnimationFrame(rafId);
		};
	});
</script>

<SEO
	title={i18n.t.seo.title}
	metaDesc="Learn more about my professional background and my approach to Cognitive Behavioral Therapy."
	lang={i18n.currentLang}
/>
<a
	href="#main-content"
	class="absolute left-0 m-3 -translate-y-16 rounded-full border border-border bg-secondary p-3 text-on-secondary transition hover:border-on-brand-container/30 hover:bg-brand-container/70 hover:shadow-xl hover:shadow-brand/10 focus:translate-y-0"
>
	{i18n.t.a11y.skip_to_content}
</a>
<Tooltip.Provider>
	<!-- SKIP LINK -->

	<Header />
	<main id="main-content">{@render children()}</main>
	<Footer />
	{#if i18n.t.footer.whatsapp_Online}
		<WhatsAppFab />
	{/if}
	<Toaster richColors position="bottom-center" closeButton pauseWhenPageIsHidden />
</Tooltip.Provider>
