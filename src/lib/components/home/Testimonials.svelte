<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import TestimonialCard from '$lib/components/ui/testimonial-card.svelte';
	import TestimonialsForm from '$lib/components/forms/TestimonialsForm.svelte';
	//Icons
	import IconChevronLeft from 'virtual:icons/tabler/chevron-left';
	import IconChevronRight from 'virtual:icons/tabler/chevron-right';

	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { TestimonialSchema } from '$lib/components/forms/schema';

	let { testimonials, data } = $props<{
		testimonials: Array<{ name: string; testimonial: string; isAnonymous: boolean }>;
		data: {
			testimonialForm: SuperValidated<Infer<TestimonialSchema>>;
		};
	}>();

	let currentIndex = $state(0);

	const next = () => {
		currentIndex = (currentIndex + 1) % testimonials.length;
	};

	const prev = () => {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
	};
</script>

<section class="scroll-m-22 overflow-hidden bg-background py-24">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="mx-auto mb-16 max-w-3xl space-y-4 text-center">
			<h2 class="home-section_h2">
				{i18n.t.testimonials.title}
			</h2>
			{#if i18n.t.testimonials.subtitle}
				<p class="home-section_subtitle">
					{i18n.t.testimonials.subtitle}
				</p>
			{/if}
		</div>
		<div class="relative mx-auto w-full max-w-4xl px-12">
			<div class="overflow-hidden py-4">
				<div
					class="flex transition-transform duration-500 ease-out"
					style="transform: translateX(-{currentIndex * 100}%)"
				>
					{#each testimonials as item (item.name)}
						<div class="w-full shrink-0 px-4">
							<TestimonialCard {...item} />
						</div>
					{/each}
				</div>
			</div>

			<!-- Navigation -->
			<Button
				onclick={prev}
				variant="icon"
				size="icon-lg"
				class="absolute top-1/2 left-0 border-border"
				aria-label={i18n.t.testimonials.previous}
			>
				<IconChevronLeft aria-hidden="true" />
			</Button>

			<Button
				onclick={next}
				variant="icon"
				size="icon-lg"
				class="absolute top-1/2 right-0  border-border"
				aria-label={i18n.t.testimonials.next}
			>
				<IconChevronRight aria-hidden="true" />
			</Button>
		</div>
		<div class="mt-12 flex w-full items-center justify-center"><TestimonialsForm {data} /></div>
	</div>
</section>

<style>
	/* Custom animations for Svelte 5 logic */
	:global(.animate-in) {
		animation: fadeIn 0.4s ease-out;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
