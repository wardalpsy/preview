<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		component: () => Promise<{ default: any }>;
		placeholder?: Snippet;
		id?: string;
		[key: string]: any;
	}

	let { component, placeholder, id, ...restProps }: Props = $props();

	let LoadedComponent = $state<any>(null);
	let container = $state<HTMLElement | null>(null);
	let isIntersecting = $state(false);
	let manualLoad = $state(false);

	onMount(() => {
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isIntersecting = true;
					observer.disconnect();
				}
			},
			{ rootMargin: '400px' } // Start loading 400px before it enters the viewport
		);

		observer.observe(container);

		// Listen for a custom event to trigger preloading
		const handlePreload = (e: any) => {
			if (e.detail?.id === id) {
				manualLoad = true;
			}
		};
		window.addEventListener('preload-component', handlePreload);

		return () => {
			observer.disconnect();
			window.removeEventListener('preload-component', handlePreload);
		};
	});

	$effect(() => {
		if ((isIntersecting || manualLoad) && !LoadedComponent) {
			component().then((module) => {
				LoadedComponent = module.default;
			});
		}
	});
</script>

<div bind:this={container} {id}>
	{#if LoadedComponent}
		<LoadedComponent {...restProps} />
	{:else if placeholder}
		{@render placeholder()}
	{:else}
		<div class="min-h-100"></div>
	{/if}
</div>
