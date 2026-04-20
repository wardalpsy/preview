import type { LayoutLoad } from './$types';
import { i18n } from '$lib/i18n.svelte';

export const load: LayoutLoad = ({ params }) => {
	const lang = params.lang || 'en';
	i18n.setLanguage(lang);
	return { lang };
};
