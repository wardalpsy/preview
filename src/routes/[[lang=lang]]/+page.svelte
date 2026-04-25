<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import About from '$lib/components/home/About.svelte';
	import Approach from '$lib/components/home/Approach.svelte';
	import Services from '$lib/components/home/Services.svelte';
	import CTA from '$lib/components/home/Cta.svelte';
	import FAQ from '$lib/components/home/FAQ.svelte';
	import Articles from '$lib/components/home/Articles.svelte';
	import LazyComponent from '$lib/components/LazyComponent.svelte';

	let { data } = $props();
</script>

<Hero />
<About about={data.about} content={data.aboutContent} />
<Approach />
<Services />
{#if i18n.t.articles.enabled && data.articles?.length > 0}
	<Articles articles={data.articles} />
{/if}

<CTA />
{#if i18n.t.testimonials.enable_testimonials}
	<LazyComponent
		component={() => import('$lib/components/home/Testimonials.svelte')}
		testimonials={i18n.t.testimonials.list}
		{data}
	/>
{/if}
<FAQ />
<LazyComponent component={() => import('$lib/components/home/Contact.svelte')} {data} />
