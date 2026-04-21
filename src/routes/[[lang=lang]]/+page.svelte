<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Practices from '$lib/components/home/Practices.svelte';
	import About from '$lib/components/home/About.svelte';
	import Approach from '$lib/components/home/Approach.svelte';
	import FAQ from '$lib/components/home/FAQ.svelte';
	import Articles from '$lib/components/home/Articles.svelte';
	import Testimonials from '$lib/components/home/Testimonials.svelte';
	import Contact from '$lib/components/home/Contact.svelte';
	let { data } = $props();
</script>

<Hero />
<About about={data.about} content={data.aboutContent} />
<Approach />
<Practices />
{#if i18n.t.articles.enabled}
	<Articles articles={data.articles} />
{/if}
<FAQ />
{#if i18n.t.testimonials.enable_testimonials}
	<Testimonials testimonials={i18n.t.testimonials.list} {data} />
{/if}
<Contact {data} />
