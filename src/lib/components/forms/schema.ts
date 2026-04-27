import { z } from 'zod';
import type { TranslationSchema } from '$lib/i18n.svelte';

// Contact Form
export const getContactSchema = (t: TranslationSchema) =>
	z.object({
		firstName: z.string().min(2, t.validation.firstName.required),
		lastName: z.string().min(2, t.validation.lastName.required),
		email: z.string().email(t.validation.email.invalid),
		phone: z
			.string()
			.min(1, t.validation.phone.required)
			// Check for only numbers (regex)
			.refine((val) => !val || /^\d+$/.test(val), {
				message: t.validation.phone.digits_only
			})
			// Check for minimum length
			.refine((val) => !val || val.length >= 8, {
				message: t.validation.phone.min.replace('{min}', '8') // "Min 8 digits"
			}),
		subject: z.string().min(5, t.validation.subject.min.replace('{min}', '5')),
		message: z
			.string()
			.min(10, t.validation.message.min.replace('{min}', '10'))
			.max(1000, t.validation.message.max.replace('{max}', '1000'))
	});

// Reserved Area Password
export const getPasswordSchema = (t: TranslationSchema) =>
	z.object({
		password: z.string().min(1, t.validation.password.required)
	});

// Testimonials
export const getTestimonialSchema = (t: TranslationSchema) =>
	z.object({
		name: z.string().max(50, t.validation.too_long.replace('{max}', '50')).optional(),
		testimonial: z
			.string()
			.min(10, t.validation.message.min.replace('{min}', '10'))
			.max(500, t.validation.message.max.replace('{max}', '500')),
		isAnonymous: z.boolean().default(false)
	});

// Contact Section (Home)
export const getContactSectionSchema = (t: TranslationSchema) =>
	z.object({
		name: z.string().min(2, t.validation.name.required),
		email: z.string().email(t.validation.email.invalid),
		message: z
			.string()
			.min(10, t.validation.message.min.replace('{min}', '10'))
			.max(500, t.validation.message.max.replace('{max}', '500'))
	});

// Consent Form
export const getConsentSchema = (t: TranslationSchema) =>
	z
		.object({
			firstName: z.string().min(2, t.validation.firstName.required),
			lastName: z.string().min(2, t.validation.lastName.required),
			email: z.string().email(t.validation.email.invalid),
			phone: z
				.string()
				.min(1, t.validation.phone.required)
				// Check for only numbers (regex)
				.refine((val) => !val || /^\d+$/.test(val), {
					message: t.validation.phone.digits_only
				})
				// Check for minimum length
				.refine((val) => !val || val.length >= 8, {
					message: t.validation.phone.min.replace('{min}', '8') // "Min 8 digits"
				}),
			signature: z.string().optional(),
			typedSignature: z.string().optional(),
			signatureType: z.enum(['draw', 'type']).default('draw'),
			notMinor: z.boolean().refine((v) => v === true, {
				message: t.validation.consent.not_minor
			}),
			birthCity: z.string().min(2, t.validation.too_short.replace('{min}', '2')),
			birthDate: z
				.string()
				.min(10, t.validation.date.invalid_format)
				.refine(
					(val) => {
						// Basic format check
						if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false;

						const [d, m, y] = val.split('/').map(Number);

						// Month check
						if (m < 1 || m > 12) return false;

						// Day check
						const daysInMonth = new Date(y, m, 0).getDate();
						if (d < 1 || d > daysInMonth) return false;

						return true;
					},
					{ message: t.validation.date.invalid_date }
				)
				.refine(
					(val) => {
						const [d, m, y] = val.split('/').map(Number);
						const date = new Date(y, m - 1, d);
						return date <= new Date();
					},
					{ message: t.validation.date.future_date }
				),
			addressResidence: z.string().min(2, t.validation.too_short.replace('{min}', '2')),
			cityResidence: z.string().min(2, t.validation.too_short.replace('{min}', '2')),
			taxId: z.string().min(2, t.validation.too_short.replace('{min}', '2')),
			isRead: z.boolean().refine((v) => v === true, {
				message: t.validation.consent.read_required
			})
		})
		.refine(
			(data) => {
				return data.signature || data.typedSignature;
			},
			{
				message: t.validation.consent.signature_required,
				path: ['signature']
			}
		);

// For backward compatibility or internal typing if needed
// Note: These will now need to be invoked with a translation schema
export type ContactSchema = ReturnType<typeof getContactSchema>;
export type PasswordSchema = ReturnType<typeof getPasswordSchema>;
export type TestimonialSchema = ReturnType<typeof getTestimonialSchema>;
export type ContactSectionSchema = ReturnType<typeof getContactSectionSchema>;
export type ConsentSchema = ReturnType<typeof getConsentSchema>;
