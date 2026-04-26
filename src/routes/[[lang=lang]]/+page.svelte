<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import About from '$lib/components/home/About.svelte';
	import Approach from '$lib/components/home/Approach.svelte';
	import Services from '$lib/components/home/Services.svelte';
	import Calendar from '$lib/components/home/Calendar.svelte';
	import FAQ from '$lib/components/home/FAQ.svelte';
	import LazyComponent from '$lib/components/LazyComponent.svelte';

	let { data } = $props();
</script>

<Hero />
<About about={data.about} content={data.aboutContent} />
<Approach />
<Services />

<Calendar {data} />
{#if i18n.t.testimonials.enable_testimonials}
	<LazyComponent
		component={() => import('$lib/components/home/Testimonials.svelte')}
		testimonials={i18n.t.testimonials.list}
		{data}
	/>
{/if}
<FAQ />
<LazyComponent component={() => import('$lib/components/home/Contact.svelte')} {data} />
