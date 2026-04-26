<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
</script>

<section id="sessions" class="relative scroll-m-12 overflow-hidden bg-background py-12 md:py-24">
	<div class="container mx-auto px-6">
		<div class="flex flex-col justify-center rounded-[2.5rem]">
			<h2 class="home-section_h2 xl:text-7xl">
				{i18n.t.cta.h2_title}
			</h2>
			{#if i18n.t.cta.subtitle}
				<p class="home-section_subtitle max-w-lg">
					{i18n.t.cta.subtitle}
				</p>
			{/if}
		</div>
	</div>
</section>
