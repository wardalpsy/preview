import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const body = (await request.json()) as any;
	const { start, attendee, eventTypeSlug, username, lang } = body;

	const finalUsername = username || 'pat.war';
	const finalEventSlug = eventTypeSlug || 'sessions';

	const protocol = request.headers.get('x-forwarded-proto') || 'http';
	const host = request.headers.get('host');
	const langPrefix = lang ? `/${lang}` : '';
	const successUrl = `${protocol}://${host}${langPrefix}/reserved/appointment/success?session_id={CHECKOUT_SESSION_ID}`;
	const cancelUrl = `${protocol}://${host}${langPrefix}/reserved/appointment`;

	if (!start || !attendee?.name || !attendee?.email) {
		return json({ error: 'Missing required booking information' }, { status: 400 });
	}

	const apiKey = platform?.env?.CAL_API_KEY;
	const stripeKey = platform?.env?.STRIPE_SECRET_KEY || 'sk_test_placeholder';
	const stripePriceId = platform?.env?.STRIPE_PRICE_ID || 'price_placeholder';

	if (!apiKey) {
		console.error('CAL_API_KEY is not defined in the environment');
		return json({ error: 'Server configuration error' }, { status: 500 });
	}

	const stripe = new Stripe(stripeKey);

	try {
		// 1. Create PENDING booking on Cal.com
		const utcStart = new Date(start).toISOString();
		const requestBody = {
			start: utcStart,
			eventTypeSlug: finalEventSlug,
			username: finalUsername,
			attendee: {
				name: attendee.name,
				email: 'wardalpsycom@protonmail.com', //attendee.email,
				timeZone: attendee.timeZone || 'Europe/Rome'
			}
		};

		const calResponse = await fetch('https://api.cal.eu/v2/bookings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'cal-api-version': '2026-02-25',
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify(requestBody)
		});

		const calResult = (await calResponse.json()) as any;

		if (!calResponse.ok) {
			console.error('Cal.com booking error:', calResult);
			return json(
				{ error: 'Failed to create booking on Cal.com', details: calResult },
				{ status: calResponse.status }
			);
		}

		const bookingUid = calResult.data?.uid || calResult.uid;

		// 2. Create Stripe Checkout Session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: stripePriceId,
					quantity: 1
				}
			],
			mode: 'payment',
			success_url: successUrl,
			cancel_url: cancelUrl,
			customer_email: attendee.email,
			client_reference_id: bookingUid,
			metadata: {
				bookingUid,
				patientName: attendee.name,
				patientEmail: attendee.email
			}
		});

		return json({
			checkoutUrl: session.url,
			bookingUid
		});
	} catch (err: any) {
		console.error('Error in booking/checkout process:', err);
		return json({ error: 'Internal server error', details: err.message }, { status: 500 });
	}
};
