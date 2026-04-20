const translationFields = [
	{
		label: 'Header',
		name: 'header',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Name', name: 'name', widget: 'string' },
			{ label: 'Specialties', name: 'specialties', widget: 'string' }
		]
	},
	{
		label: 'Navigation',
		name: 'nav',
		widget: 'object',
		fields: [
			{ label: 'About Link', name: 'about', widget: 'string' },
			{ label: 'Approach Link', name: 'approach', widget: 'string' },
			{ label: 'Services Link', name: 'services', widget: 'string' },
			{ label: 'Articles Link', name: 'articles', widget: 'string' },
			{ label: 'Contact Link', name: 'contact', widget: 'string' },
			{ label: 'FAQ Link', name: 'faq', widget: 'string' },
			{ label: 'Testimonials Link', name: 'testimonials', widget: 'string' }
		]
	},
	{
		label: 'Hero',
		name: 'hero',
		widget: 'object',
		fields: [
			{
				label: 'Hero Image',
				name: 'image',
				widget: 'image',
				choose_url: false,
				hint: 'DO NOT upload images with width/height >2000px'
			},
			{ label: 'Name', name: 'name', widget: 'string' },
			{ label: 'Role', name: 'role', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{ label: 'CTA Primary', name: 'cta_primary', widget: 'string' },
			{ label: 'CTA Secondary', name: 'cta_secondary', widget: 'string' },
			{ label: 'Image Alt', name: 'image_alt', widget: 'string' },
			{ label: 'Quote', name: 'quote', widget: 'string', required: false }
		]
	},
	{
		label: 'Therapeutic Approach (Method)',
		name: 'method',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{
				label: 'Pillars',
				name: 'pillars',
				widget: 'list',
				fields: [
					{ label: 'Title', name: 'title', widget: 'string' },
					{ label: 'Description', name: 'description', widget: 'text' },
					{ label: 'Icon', name: 'icon', widget: 'string' }
				]
			}
		]
	},
	{
		label: 'Services',
		name: 'services',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{ label: 'Not Found Text', name: 'not_found', widget: 'string' },
			{ label: 'Contact Me Text', name: 'contact_me', widget: 'string' },
			{
				label: 'Items',
				name: 'items',
				widget: 'list',
				fields: [
					{ label: 'ID', name: 'id', widget: 'string' },
					{ label: 'Title', name: 'title', widget: 'string' },
					{ label: 'Description', name: 'description', widget: 'text' }
				]
			}
		]
	},
	{
		label: 'About Section',
		name: 'about',
		widget: 'object',
		fields: [
			{ label: 'Badge', name: 'badge', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'string' },
			{ label: 'Quote', name: 'quote', widget: 'string' },
			{ label: 'Text P1', name: 'text_p1', widget: 'text' },
			{ label: 'Text P2', name: 'text_p2', widget: 'text' },
			{ label: 'CTA', name: 'cta', widget: 'string' },
			{ label: 'Image Alt', name: 'image_alt', widget: 'string' }
		]
	},
	{
		label: 'FAQ',
		name: 'faq',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{
				label: 'Items',
				name: 'items',
				widget: 'list',
				fields: [
					{ label: 'ID', name: 'id', widget: 'string' },
					{ label: 'Question', name: 'question', widget: 'string' },
					{ label: 'Answer', name: 'answer', widget: 'text' }
				]
			}
		]
	},
	{
		label: 'Articles',
		name: 'articles',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{ label: 'CTA', name: 'cta', widget: 'string' },
			{ label: 'Read More', name: 'read_more', widget: 'string' }
		]
	},
	{
		label: 'Sessions (Availability)',
		name: 'sessions',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{ label: 'CTA WhatsApp', name: 'cta_whatsapp', widget: 'string' },
			{ label: 'CTA Call', name: 'cta_call', widget: 'string' }
		]
	},
	{
		label: 'Footer',
		name: 'footer',
		widget: 'object',
		fields: [
			{ label: 'Description', name: 'description', widget: 'text' },
			{ label: 'Contact Title', name: 'contact_title', widget: 'string' },
			{ label: 'Location', name: 'location', widget: 'string' },
			{ label: 'Legal Title', name: 'legal_title', widget: 'string' },
			{ label: 'Quick Links', name: 'quick_links', widget: 'string' },
			{ label: 'Rights', name: 'rights', widget: 'string' },
			{ label: 'VAT No', name: 'vat', widget: 'string' },
			{ label: 'Register No', name: 'register', widget: 'string' },
			{ label: 'Privacy Policy', name: 'privacy', widget: 'string' },
			{ label: 'Cookie Policy', name: 'cookies', widget: 'string' },
			{ label: 'Accessibility', name: 'accessibility', widget: 'string' },
			{ label: 'Enable WhatsApp', name: 'whatsapp_Online', widget: 'boolean' },
			{ label: 'WhatsApp Number', name: 'whatsapp', widget: 'string' },
			{ label: 'WhatsApp Message', name: 'whatsapp_message', widget: 'string' }
		]
	},
	{
		label: 'Informed Consent',
		name: 'consent',
		widget: 'object',
		fields: [
			{ label: 'Legal Title', name: 'legal_title', widget: 'string' },
			{ label: 'Legal Text Short', name: 'legal_text_short', widget: 'text' },
			{ label: 'Label Name', name: 'label_name', widget: 'string' },
			{ label: 'Label Email', name: 'label_email', widget: 'string' },
			{ label: 'Label Signature', name: 'label_signature', widget: 'string' },
			{ label: 'Submit', name: 'submit', widget: 'string' },
			{ label: 'Badge Step 1', name: 'badge_step1', widget: 'string' },
			{ label: 'Badge Step 2', name: 'badge_step2', widget: 'string' },
			{ label: 'Thanks', name: 'thanks', widget: 'string' },
			{ label: 'Success Message', name: 'success_message', widget: 'text' },
			{ label: 'Calendar Title', name: 'calendar_title', widget: 'string' }
		]
	}
];

export const articlesCollection = {
	name: 'articles',
	label: 'Articles (Markdown)',
	label_singular: 'Article',
	folder: 'src/lib/articles',
	extension: 'md',
	format: 'frontmatter',
	create: true,
	slug: '{{slug}}',
	path: '{{lang}}/{{slug}}',
	fields: [
		{
			label: 'Language',
			name: 'lang',
			widget: 'select',
			options: ['en', 'it', 'pl'],
			default: 'en'
		},
		{ label: 'Title', name: 'title', widget: 'string' },
		{ label: 'Description', name: 'description', widget: 'text' },
		{ label: 'Date', name: 'date', widget: 'string' },
		{ label: 'Category', name: 'category', widget: 'string' },
		{ label: 'Featured Image', name: 'image', widget: 'image', required: false },
		{ label: 'Body', name: 'body', widget: 'markdown' }
	]
};

export const translationCollection = {
	name: 'translations',
	label: 'Translations',
	files: [
		{
			label: 'English (EN)',
			name: 'en',
			file: 'src/lib/locales/en.json',
			fields: translationFields
		},
		{
			label: 'Italian (IT)',
			name: 'it',
			file: 'src/lib/locales/it.json',
			fields: translationFields
		},
		{
			label: 'Polish (PL)',
			name: 'pl',
			file: 'src/lib/locales/pl.json',
			fields: translationFields
		}
	]
};
