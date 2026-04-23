<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	//import Services from '$lib/components/home/Services.svelte';
	import About from '$lib/components/home/About.svelte';
	//import Approach from '$lib/components/home/Approach.svelte';
	import Approach2 from '$lib/components/home/Approach2.svelte';
	//import Approach3 from '$lib/components/home/Approach3.svelte';
	import Services from '$lib/components/home/Services.svelte';
	import MidHero from '$lib/components/home/MidHero.svelte';
	import FAQ from '$lib/components/home/FAQ.svelte';
	import Articles from '$lib/components/home/Articles.svelte';
	import Testimonials from '$lib/components/home/Testimonials.svelte';
	import Contact from '$lib/components/home/Contact.svelte';
	let { data } = $props();
</script>

<Hero />
<About about={data.about} content={data.aboutContent} />
<Approach2 />
<Services />
{#if i18n.t.articles.enabled}
	<Articles articles={data.articles} />
{/if}
<FAQ />
<MidHero />
{#if i18n.t.testimonials.enable_testimonials}
	<Testimonials testimonials={i18n.t.testimonials.list} {data} />
{/if}
<Contact {data} />
