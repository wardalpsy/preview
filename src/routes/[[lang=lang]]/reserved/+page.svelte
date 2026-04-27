<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import ReservedAreaForm from '$lib/components/forms/ReservedAreaForm.svelte';
	// Icons
	import IconUserKey from 'virtual:icons/tabler/user-key';
	import type { PageData } from './$types.js';
	import { base } from '$app/paths';
	let { data }: { data: PageData } = $props();
	const l = (path: string) => {
		const lang = i18n.currentLang;
		const prefix = lang === 'en' ? '' : `/${lang}`;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${base}${prefix}${cleanPath === '/' && lang !== 'en' ? '' : cleanPath}`;
	};
</script>

<div class="flex min-h-[80vh] items-center justify-center bg-background px-6">
	<div
		class="w-full max-w-md rounded-[2.5rem] border bg-secondary p-12 text-center text-on-secondary shadow-xl shadow-brand/15"
	>
		<!-- Icon -->
		<div
			class="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand/5 text-brand"
		>
			<IconUserKey class="size-7" aria-hidden="true" />
		</div>

		<h1 class="mb-4 font-serif text-3xl text-brand">{i18n.t.reserved.title}</h1>
		<p class="mb-10 text-sm leading-relaxed text-foreground/90">
			{i18n.t.reserved.info}
		</p>
		<ReservedAreaForm {data} />
		<p class="mt-8 text-sm text-foreground/90 italic">
			{i18n.t.reserved.no_pass_info}&nbsp;<br />
			<a
				href={l('/#sessions')}
				class="text-primary underline underline-offset-4 transition-colors hover:text-brand hover:decoration-2"
				onmouseenter={() => {
					window.dispatchEvent(new CustomEvent('preload-component', { detail: { id: 'contact' } }));
				}}
			>
				{i18n.t.reserved.no_pass_info_link}</a
			>
		</p>
	</div>
</div>
