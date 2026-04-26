import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { Resend } from 'resend';
import {
	getTestimonialSchema,
	getContactSectionSchema,
	getContactSchema
} from '../../lib/components/forms/schema';
import { RESEND_API_KEY } from '$env/static/private';
import en from '$lib/locales/en.json';
import it from '$lib/locales/it.json';
import pl from '$lib/locales/pl.json';

const translations: any = { en, it, pl };
const resend = new Resend(RESEND_API_KEY);

export const load = async ({ params }) => {
	const lang = params.lang || 'en';
	const t = translations[lang] || en;
	return {
		testimonialForm: await superValidate(zod4(getTestimonialSchema(t)), { id: 'testimonial-form' }),
		contactSectionForm: await superValidate(zod4(getContactSectionSchema(t)), {
			id: 'contact-section-form'
		}),
		appointmentForm: await superValidate(zod4(getContactSchema(t)), { id: 'appointment-form' })
	};
};

export const actions = {
	submitTestimonial: async (event) => {
		const lang = event.params.lang || 'en';
		const t = translations[lang] || en;
		const form = await superValidate(event, zod4(getTestimonialSchema(t)), {
			id: 'testimonial-form'
		});

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { name, testimonial, isAnonymous } = form.data;
			const toEmail = t.contact?.contact_form_target || 'wardalpsy@gmail.com';

			const { data, error } = await resend.emails.send({
				from: 'WardalPsy Form <no-reply@wardalpsy.com>',
				to: toEmail,
				subject: `${t.emails?.new_testimonial_subject || 'Testimonial form'}: New testimonial`,
				html: `
          <h3>New Testimonial from ${name || 'Anonymous'}</h3>
          <p><strong>Requesting Anonymity:</strong> ${isAnonymous ? 'Yes' : 'No'}</p>
          <p><strong>Message:</strong></p>
          <p>${testimonial}</p>
        `
			});

			if (error) {
				return message(
					form,
					t.contact?.send_error || 'Email failed to send. Please try again later.',
					{ status: 500 }
				);
			}
			if (data?.id) {
				console.log('✅ Email sent via Resend:', data.id);
			}
			return message(form, t.contact?.send_success || 'Message sent successfully!');
		} catch (err) {
			console.error('Contact form submission error:', err);
			return message(form, t.contact?.unexpected_error || 'An unexpected error occurred.', {
				status: 500
			});
		}
	},

	submitContactSection: async (event) => {
		const lang = event.params.lang || 'en';
		const t = translations[lang] || en;
		const form = await superValidate(event, zod4(getContactSectionSchema(t)), {
			id: 'contact-section-form'
		});

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { name, email, message: userMessage } = form.data;
			const toEmail = t.contact?.contact_form_target || 'wardalpsy@gmail.com';

			const { data, error } = await resend.emails.send({
				from: 'WardalPsy Form <no-reply@wardalpsy.com>',
				to: toEmail,
				replyTo: email,
				subject: `${t.emails?.new_contact_section_subject || 'Contact section'}: new message from ${name}`,
				html: `
          <h3>New Message from ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${userMessage}</p>
        `
			});

			if (error) {
				return message(
					form,
					t.contact?.send_error || 'Email failed to send. Please try again later.',
					{ status: 500 }
				);
			}
			if (data?.id) {
				console.log('✅ Email sent via Resend:', data.id);
			}
			return message(form, t.contact?.send_success || 'Message sent successfully!');
		} catch (err) {
			console.error('Contact form submission error:', err);
			return message(form, t.contact?.unexpected_error || 'An unexpected error occurred.', {
				status: 500
			});
		}
	},

	submitAppointment: async (event) => {
		const lang = event.params.lang || 'en';
		const t = translations[lang] || en;
		const form = await superValidate(event, zod4(getContactSchema(t)), { id: 'appointment-form' });

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { firstName, lastName, email, phone, subject, message: userMsg } = form.data;
			const toEmail = t.contact?.contact_form_target || 'wardalpsy@gmail.com';

			const { data, error } = await resend.emails.send({
				from: 'WardalPsy Form <no-reply@wardalpsy.com>',
				to: toEmail,
				subject: `${t.emails?.new_request_subject || 'Appointment request'}: ${subject}`,
				html: `
          <h3>New booking request from ${firstName} ${lastName}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${userMsg}</p>
        `
			});

			if (error) {
				return message(
					form,
					t.contact?.send_error || 'Email failed to send. Please try again later.',
					{ status: 500 }
				);
			}
			if (data?.id) {
				console.log('✅ Email sent via Resend:', data.id);
			}
			return message(form, t.contact?.send_success || 'Message sent successfully!');
		} catch (err) {
			console.error('Contact form submission error:', err);
			return message(form, t.contact?.unexpected_error || 'An unexpected error occurred.', {
				status: 500
			});
		}
	}
};
