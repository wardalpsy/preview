<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		component: () => Promise<{ default: any }>;
		placeholder?: Snippet;
		[key: string]: any;
	}

	let { component, placeholder, ...restProps }: Props = $props();

	let LoadedComponent = $state<any>(null);
	let container = $state<HTMLElement | null>(null);
	let isIntersecting = $state(false);

	onMount(() => {
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isIntersecting = true;
					observer.disconnect();
				}
			},
			{ rootMargin: '200px' } // Start loading 200px before it enters the viewport
		);

		observer.observe(container);

		return () => observer.disconnect();
	});

	$effect(() => {
		if (isIntersecting && !LoadedComponent) {
			component().then((module) => {
				LoadedComponent = module.default;
			});
		}
	});
</script>

<div bind:this={container}>
	{#if LoadedComponent}
		<LoadedComponent {...restProps} />
	{:else if placeholder}
		{@render placeholder()}
	{:else}
		<div class="min-h-[400px]"></div>
	{/if}
</div>
