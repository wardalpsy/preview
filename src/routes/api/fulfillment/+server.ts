import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { generateConsentPDF } from '$lib/server/pdf';
import type { RequestHandler } from './$types';
import en from '$lib/locales/en.json';
import it from '$lib/locales/it.json';
import pl from '$lib/locales/pl.json';

const translations: any = { en, it, pl };
const resend = new Resend(RESEND_API_KEY);

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const body = (await request.json()) as any;
		const { patient, slot, bookingId, lang = 'en' } = body;

		const t = translations[lang] || translations.en;
		const doctorEmail = (platform as any)?.env?.DOCTOR_EMAIL || 'wardalpsycom@protonmail.com';
		const calApiKey = (platform as any)?.env?.CAL_API_KEY;

		if (!patient || !slot) {
			return json({ error: 'Missing data' }, { status: 400 });
		}

		// Confirm booking on Cal.com
		if (calApiKey && bookingId) {
			try {
				await fetch(`https://api.cal.eu/v2/bookings/${bookingId}/confirm`, {
					method: 'POST',
					headers: {
						'cal-api-version': '2026-02-25',
						Authorization: `Bearer ${calApiKey}`,
						'Content-Type': 'application/json'
					}
				});
			} catch (e) {
				console.error('Error confirming booking:', e);
			}
		}

		const fullName = `${patient.firstName} ${patient.lastName}`;

		// Load exact legal text from MD file based on language
		let legalText = t.consent.legal_text_full || t.consent.legal_text_short;
		try {
			const mdFiles = import.meta.glob('/src/lib/legal/consent/*.md', {
				query: '?raw',
				import: 'default'
			});
			const mdPath = `/src/lib/legal/consent/${lang}.md`;
			if (mdFiles[mdPath]) {
				const rawContent = (await mdFiles[mdPath]()) as string;
				// Simple frontmatter strip
				legalText = rawContent.replace(/^---[\s\S]*?---/, '').trim();
			}
		} catch (e) {
			console.error('Error loading MD legal text for PDF:', e);
		}

		// Generate PDF
		const pdfBuffer = await generateConsentPDF({
			firstName: patient.firstName,
			lastName: patient.lastName,
			email: patient.email,
			phone: patient.phone,
			birthCity: patient.birthCity,
			birthDate: patient.birthDate,
			addressResidence: patient.addressResidence,
			cityResidence: patient.cityResidence,
			taxId: patient.taxId,
			notMinor: patient.notMinor,
			signature: patient.signature,
			typedSignature: patient.typedSignature,
			signatureType: patient.signatureType || 'draw',
			date: new Date().toLocaleDateString(
				lang === 'pl' ? 'pl-PL' : lang === 'it' ? 'it-IT' : 'en-US'
			),
			legalText,
			title: t.consent.legal_title,
			labels: {
				patient: t.consent.full_name,
				email: t.contact.email,
				phone: t.contact.phone,
				date: t.consent.date || 'Date',
				birthCity: t.consent.birth_city,
				birthDate: t.consent.birth_date,
				addressResidence: t.consent.resident_address,
				cityResidence: t.consent.resident_city,
				taxId: 'CF/NIN/PESEL',
				notMinor: t.consent.not_minor
			}
		});

		const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

		// Send Email to Patrycja
		await resend.emails.send({
			from: 'Wardal Psy. <appointments@wardalpsy.com>',
			to: doctorEmail,
			subject: `${t.emails?.new_booking_subject || 'Nuova Prenotazione'}: ${fullName}`,
			html: `
				<h1>${t.emails?.new_booking_title || 'Nuovo Appuntamento Confermato'}</h1>
				<p><strong>${t.contact?.name || 'Paziente'}:</strong> ${fullName}</p>
				<p><strong>Email:</strong> ${patient.email}</p>
				<p><strong>${t.consent?.date || 'Data'}:</strong> ${new Date(slot.start || slot.time).toLocaleString(lang === 'it' ? 'it-IT' : 'en-US')}</p>
				<p><strong>ID Cal.com:</strong> ${bookingId}</p>
			`,
			attachments: [
				{
					filename: `consenso_${fullName.replace(/\s+/g, '_')}.pdf`,
					content: pdfBase64
				}
			]
		});

		// Send Email to Patient
		await resend.emails.send({
			from: 'Wardal Psy. <no-reply@wardalpsy.com>',
			to: patient.email,
			subject: t.emails?.confirmation_subject || 'Conferma Prenotazione - Dott.ssa Wardal',
			html: `
				<h1>${t.emails?.confirmation_title || 'Prenotazione Confermata'}</h1>
				<p>${t.emails?.confirmation_greeting?.replace('{name}', fullName) || `Gentile ${fullName},`}</p>
				<p>${t.emails?.confirmation_body?.replace('{date}', new Date(slot.start || slot.time).toLocaleString(lang === 'it' ? 'it-IT' : 'en-US')) || `Il tuo appuntamento è stato confermato.`}</p>
				<p>${t.emails?.confirmation_footer || 'A presto,<br>Dott.ssa Patrycja Wardal'}</p>
			`,
			attachments: [
				{
					filename: 'consenso_informato_firmato.pdf',
					content: pdfBase64
				}
			]
		});

		return json({ success: true });
	} catch (err: any) {
		console.error('Fulfillment error:', err);
		return json({ error: err.message }, { status: 500 });
	}
};
