import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { getPasswordSchema } from '../../../lib/components/forms/schema';
import { PATIENT_PASSWORD } from '$env/static/private';
import en from '$lib/locales/en.json';
import it from '$lib/locales/it.json';
import pl from '$lib/locales/pl.json';

const translations: any = { en, it, pl };

export const load = async ({ params }) => {
	const lang = params.lang || 'en';
	const t = translations[lang] || en;
	return {
		form: await superValidate(zod4(getPasswordSchema(t)))
	};
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		const lang = params.lang || 'en';
		const t = translations[lang] || en;
		const form = await superValidate(request, zod4(getPasswordSchema(t)));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (form.data.password !== PATIENT_PASSWORD) {
			return message(form, t.reserved?.invalid_password || 'Invalid password. Please try again.', {
				status: 403
			});
		}

		// Set cookie for access
		cookies.set('session_access', 'granted', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 24 hours
		});

		// Logic for successful login
		const target = lang === 'en' ? '/reserved/appointment' : `/${lang}/reserved/appointment`;
		throw redirect(303, target);
	}
};
