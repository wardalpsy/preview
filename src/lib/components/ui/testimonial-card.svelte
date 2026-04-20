<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	let { testimonial, name, isAnonymous } = $props<{
		testimonial: string;
		name: string;
		isAnonymous: boolean;
	}>();
</script>

<div
	class="flex h-full flex-col rounded-[2rem] border bg-white p-8 italic shadow-md shadow-brand/10"
>
	<div class="mb-6 text-brand opacity-20">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 24 24"
			fill="currentColor"
			><path
				d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.437.917-3.996 3.638-3.996 5.849h3.983v10h-9.987z"
			/></svg
		>
	</div>

	<p class="mb-8 grow leading-relaxed text-foreground">
		"{testimonial}"
	</p>

	<div class="flex items-center gap-3 not-italic">
		<div class="h-px w-8 bg-border"></div>
		{#if isAnonymous}
			<!--"Redacted"-->
			<span class="ml-2 text-[10px] tracking-tighter uppercase">
				{i18n.t.testimonials.anonymized}</span
			>
		{:else}
			<span class="text-xs font-bold tracking-widest text-brand uppercase">
				{name}
			</span>
		{/if}
	</div>
</div>
