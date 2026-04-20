import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, params, url }) => {
	const session = cookies.get('session_access');
	const lang = params.lang || '';
	const langPrefix = lang ? `/${lang}` : '';
	
	// Don't redirect if already on the password page or success page
	const isReservedRoot = url.pathname === `${langPrefix}/reserved` || url.pathname === `/reserved`;
	const isSuccessPage = url.pathname.endsWith('/success');

	if (isReservedRoot || isSuccessPage) {
		return {};
	}

	if (session !== 'granted') {
		throw redirect(302, `${langPrefix}/reserved`);
	}

	return {};
};
