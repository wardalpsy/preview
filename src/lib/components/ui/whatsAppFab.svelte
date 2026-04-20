<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { i18n } from '$lib/i18n.svelte';
	import IconBrandWhatsapp from 'virtual:icons/tabler/brand-whatsapp';
	// Reactive URL based on current language
	let whatsappUrl = $derived(
		`https://wa.me/${i18n.t.footer.whatsapp}?text=${encodeURIComponent(i18n.t.footer.whatsapp_message)}`
	);
</script>

<div class="fixed right-6 bottom-6 z-50 flex items-center gap-3">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<a
					{...props}
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${i18n.t.footer.whatsapp_message} ${i18n.t.footer.external_link}`}
					class="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary transition-transform hover:scale-110 hover:shadow-2xl hover:shadow-brand/15 active:scale-95"
				>
					<IconBrandWhatsapp class="size-6" aria-hidden="true" />
				</a>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{i18n.t.footer.whatsapp_message}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
