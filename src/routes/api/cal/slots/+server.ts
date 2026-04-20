import { json } from '@sveltejs/kit';
import { CAL_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, platform }) => {
	const month = url.searchParams.get('month'); // YYYY-MM
	const timeZone = url.searchParams.get('timeZone') || 'Europe/Rome';

	const username = 'pat.war';
	const eventTypeSlug = 'pre-booking';

	const apiKey = CAL_API_KEY || (platform as any)?.env?.CAL_API_KEY;

	if (!apiKey) {
		return json({ error: 'CAL_API_KEY is not defined' }, { status: 500 });
	}

	if (!month) {
		return json({ error: 'Month is required' }, { status: 400 });
	}

	// Calculate start and end of the month in YYYY-MM-DD format as per docs
	const start = `${month}-01`;
	const lastDay = new Date(
		new Date(month + '-01').getFullYear(),
		new Date(month + '-01').getMonth() + 1,
		0
	).getDate();
	const end = `${month}-${lastDay}`;

	try {
		// Using api.cal.eu for EU instance as in the booking endpoint
		// We add format=range to get both start and end times
		const slotsUrl = `https://api.cal.eu/v2/slots?eventTypeSlug=${eventTypeSlug}&username=${username}&start=${start}&end=${end}&timeZone=${timeZone}&format=range`;

		//console.log('Fetching slots from EU:', slotsUrl);

		const response = await fetch(slotsUrl, {
			headers: {
				'cal-api-version': '2024-09-04',
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Slots fetch failed:', errorData);
			return json(
				{ error: 'Failed to fetch slots', details: errorData },
				{ status: response.status }
			);
		}

		const data = await response.json();
		//console.log('Slots data received from Cal.com:', JSON.stringify(data, null, 2));
		return json(data);
	} catch (err) {
		console.error('Server error in slots proxy:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
