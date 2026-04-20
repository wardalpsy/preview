import { z } from 'zod';
import type { TranslationSchema } from '$lib/i18n.svelte';

// Contact Form
export const getContactSchema = (t: TranslationSchema) =>
	z.object({
		firstName: z.string().min(2, t.contact?.first_name_required || 'First name is required'),
		lastName: z.string().min(2, t.contact?.last_name_required || 'Last name is required'),
		email: z.string().email(t.contact?.invalid_email || 'Invalid email address'),
		phone: z.string().optional(),
		subject: z.string().min(5, t.contact?.subject_min || 'Subject must be at least 5 characters'),
		message: z
			.string()
			.min(10, t.contact?.message_min || 'Message must be at least 10 characters')
			.max(1000, t.contact?.message_max || 'Message must be shorter than 1000 characters')
	});

// Reserved Area Password
export const getPasswordSchema = (t: TranslationSchema) =>
	z.object({
		password: z.string().min(1, t.reserved?.password_required || 'Password is required')
	});

// Testimonials
export const getTestimonialSchema = (t: TranslationSchema) =>
	z.object({
		name: z
			.string()
			.max(50, t.testimonials?.name_max || "Name shouldn't be longer than 50 characters")
			.optional(),
		testimonial: z
			.string()
			.min(10, t.testimonials?.message_min || 'Message must be at least 10 characters')
			.max(500, t.testimonials?.message_max || 'Message must be shorter than 500 characters'),
		isAnonymous: z.boolean().default(false)
	});

// Contact Section (Home)
export const getContactSectionSchema = (t: TranslationSchema) =>
	z.object({
		name: z.string().min(2, t.contact?.name_required || 'Name is required'),
		email: z.string().email(t.contact?.invalid_email || 'Invalid email address'),
		message: z
			.string()
			.min(10, t.contact?.message_min || 'Message must be at least 10 characters')
			.max(500, t.contact?.message_max || 'Message must be shorter than 500 characters')
	});

// Consent Form
export const getConsentSchema = (t: TranslationSchema) =>
	z
		.object({
			firstName: z.string().min(2, t.contact?.first_name_required || 'First name is required'),
			lastName: z.string().min(2, t.contact?.last_name_required || 'Last name is required'),
			email: z.string().email(t.contact?.invalid_email || 'Invalid email address'),
			phone: z.string().optional(),
			signature: z.string().optional(),
			typedSignature: z.string().optional(),
			signatureType: z.enum(['draw', 'type']).default('draw'),
			isRead: z.boolean().refine((v) => v === true, {
				message: t.consent?.read_required || 'Please confirm that you have read the consent.'
			})
		})
		.refine(
			(data) => {
				return data.signature || data.typedSignature;
			},
			{
				message: t.consent?.signature_required || 'Please provide a signature',
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
