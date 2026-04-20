import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { getConsentSchema } from '$lib/components/forms/schema';
import type { PageServerLoad } from './$types';
import en from '$lib/locales/en.json';
import it from '$lib/locales/it.json';
import pl from '$lib/locales/pl.json';

const translations: any = { en, it, pl };

export const load: PageServerLoad = async ({ params }) => {
	const lang = params.lang || 'en';
	const t = translations[lang] || en;
	return {
		form: await superValidate(zod4(getConsentSchema(t)))
	};
};
