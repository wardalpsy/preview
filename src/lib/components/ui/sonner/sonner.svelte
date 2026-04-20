<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner';
	import { mode } from 'mode-watcher';
	import Loader2Icon from 'virtual:icons/tabler/loader-2';
	import CircleCheckIcon from 'virtual:icons/tabler/circle-check';
	import OctagonXIcon from 'virtual:icons/tabler/alert-circle';
	import InfoIcon from 'virtual:icons/tabler/info-circle';
	import TriangleAlertIcon from 'virtual:icons/tabler/icons/alert-triangle';

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	duration={8000}
	style="
		--normal-bg: var(--color-secondary); 
		--normal-text: var(--color-on-secondary); 
		--normal-border: var(--color-border);
		/* Success Styling */
		--success-bg: var(--color-secondary);
		--success-text: var(--color-on-secondary);
		--success-border: var(--color-primary-container);

		/* Error Styling */
		--error-bg: var(--color-secondary);
		--error-text: var(--color-on-secondary);
		--error-border: var(--color-destructive);

		/* Info Styling */
		--info-bg: var(--color-secondary);
		--info-text: var(--color-on-secondary);
		--info-border: var(--color-border);
		"
	{...restProps}
	toastOptions={{
		classes: {
			closeButton:
				'!bg-white hover:!bg-white hover:!text-black hover:!border-border transition-colors'
		}
	}}
>
	{#snippet loadingIcon()}
		<Loader2Icon class="size-4 animate-spin text-border" />
	{/snippet}
	{#snippet successIcon()}
		<CircleCheckIcon class="size-4 text-green-600" />
	{/snippet}
	{#snippet errorIcon()}
		<OctagonXIcon class="size-4 text-destructive" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="size-4 text-foreground" />
	{/snippet}
	{#snippet warningIcon()}
		<TriangleAlertIcon class="size-4 text-orange-600" />
	{/snippet}
</Sonner>
