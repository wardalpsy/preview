const translationFields = [
	{
		label: 'Header',
		hint: 'Header (logo) elements',
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
		hint: 'Header navigation elements',
		name: 'nav',
		widget: 'object',
		fields: [
			{ label: 'About Link Text', name: 'about', widget: 'string' },
			{ label: 'Approach Link Text', name: 'approach', widget: 'string' },
			{ label: 'Practices Link Text', name: 'practices', widget: 'string' },
			{ label: 'Articles Link Text', name: 'articles', widget: 'string' },
			{ label: 'Contact Link Text', name: 'contact', widget: 'string' },
			{ label: 'FAQ Link Text', name: 'faq', widget: 'string' },
			{ label: 'Testimonials Link Text', name: 'testimonials', widget: 'string' }
		]
	},
			{
			label: 'Multilingual Switch', 
			name: 'lang_switch',
			widget: 'object',
			fields: [
				{ label: 'Enable flags', name: 'flags', widget: 'boolean', hint: 'Show hide flag icons.'},
				{ label: 'English Label', name: 'label_EN', widget: 'string' },
				{ label: 'Italian Label', name: 'label_IT', widget: 'string' },
				{ label: 'Polish Label', name: 'label_PL', widget: 'string' }
			]		
	},
	{
		label: 'Hero Section',
		name: 'hero',
		widget: 'object',
		fields: [
			{
				label: 'Hero Image',
				name: 'image',
				widget: 'image',
				choose_url: false,
				hint: 'Prefer images with aspect ratio 4/5. Max. resolution: 800x1000px'
			},
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'string' },
			{ label: 'CTA Primary', name: 'cta_primary', widget: 'string' },
			{ label: 'CTA Secondary', name: 'cta_secondary', widget: 'string' },
			{ label: 'Image Alt', name: 'image_alt', widget: 'string' },
			{ label: 'Quote', name: 'quote', widget: 'string', hint:'Leave empty to disable the quote overlay over the hero image', required: false }
		]
	},
	{
		label: 'About Section (Filled from the About (Markdown) collection.)',
    name: 'dummy',
    widget: 'string', 
    readonly: true,   
    required: false,  
    default: '',    
  	hint: "The about section is filled from the About (Markdown) collection."
	},
	{
		label: 'Therapeutic Approach',
		name: 'approach',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{
				label: 'Approach Pillars',
				name: 'pillars',
				widget: 'list',
				fields: [
					{ label: 'Title', name: 'title', widget: 'string' },
					{ label: 'Description', name: 'description', widget: 'text' },
					{ label: 'Icon', name: 'icon', widget: 'string', hint: 'Go to https://icon-sets.iconify.design/tabler/  select an icon and copy the name without the "tabler:" prefix.' }
				]
			}
		]
	},
	{
		label: 'Practices',
		name: 'practices',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'string' },
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
		label: 'FAQ',
		name: 'faq',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'string', required: 'false', hint: 'Leave empty to disable' },
			{ label: 'Additional Question', name: 'additional_question', widget: 'string', hint:'Control the contact me link at the bottom of the section. If one of the Additional Question fiels is empty will disable the link', required: 'false'},
			{ label: 'Additional Question Link Text', name: 'ask_me', widget: 'string', hint:'Control the contact me link at the bottom of the section. If one of the Additional Question fiels is empty will disable the link', required: 'false'},
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
		label: 'Testimonials',
		name: 'testimonials',
		widget: 'object',
		fields: [
			{ label: 'Enable Testimonials', name: 'enable_testimonials', widget: 'boolean' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Subtitle', name: 'subtitle', widget: 'text' },
			{ label: 'CTA Button', name: 'cta_button', widget: 'string' },
			{ label: 'Modal Title', name: 'modal_title', widget: 'string' },
			{ label: 'Modal Description', name: 'modal_desc', widget: 'text' },
			{ label: 'Name Label', name: 'name_label', widget: 'string' },
			{ label: 'Message Label', name: 'msg_label', widget: 'string' },
			{ label: 'Anonymity Label', name: 'anon_label', widget: 'string' },
			{ label: 'Anonymity Hint', name: 'anon_hint', widget: 'text' },
			{ label: 'Submit Button', name: 'submit_btn', widget: 'string' },
			{ label: 'Success Message', name: 'success_msg', widget: 'text' },
			{ label: 'Policy Link Text', name: 'policy_link', widget: 'string' },
			{ label: 'Policy Info', name: 'policy_info', widget: 'string' },
			{ label: 'Anonymized Text', name: 'anonymized', widget: 'string' },
			{ label: 'Previous Aria Label', name: 'previous', widget: 'string' },
			{ label: 'Next Aria Label', name: 'next', widget: 'string' },
			{
				label: 'Testimonials List',
				name: 'list',
				widget: 'list',
				summary: '{{name}}',
				fields: [
					{ label: 'Name', name: 'name', widget: 'string' },
					{ label: 'Testimonial', name: 'testimonial', widget: 'text' },
					{ label: 'Is Anonymous', name: 'isAnonymous', widget: 'boolean' }
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
	},
	{
		label: 'Contact Form',
		name: 'contact',
		widget: 'object',
		fields: [
			{ label: 'Subject', name: 'subject', widget: 'string' },
			{ label: 'First Name', name: 'first_name', widget: 'string' },
			{ label: 'Last Name', name: 'last_name', widget: 'string' },
			{ label: 'Email', name: 'email', widget: 'string' },
			{ label: 'Phone', name: 'phone', widget: 'string' },
			{ label: 'Message', name: 'message', widget: 'string' },
			{ label: 'Placeholder', name: 'avail_placeholder', widget: 'string' },
			{ label: 'Send Request', name: 'send_request', widget: 'string' },
			{ label: 'Sending', name: 'sending', widget: 'string' },
			{ label: 'Complete Request', name: 'complete_request', widget: 'string' },
			{ label: 'Appointment Info', name: 'request_appointment_info', widget: 'string' },
			{ label: 'Request Info', name: 'request_info', widget: 'text' },
			{ label: 'WhatsApp Message', name: 'whatsapp_appointment_message', widget: 'string' }
		]
	},
	{
		label: 'Reserved Area',
		name: 'reserved',
		widget: 'object',
		fields: [
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Info', name: 'info', widget: 'text' }
		]
	},
	{
		label: 'Accessibility',
		name: 'a11y',
		widget: 'object',
		hint: 'Values for accessibility (mostly for visual diasbled visitors)',
		fields: [
			{ label: 'Skip to Main', name: 'skip_to_content', widget: 'string' },
			{ label: 'Open Menu', name: 'open_menu', widget: 'string' },
			{ label: 'Toggle Menu', name: 'toggle_menu', widget: 'string' },
			{ label: 'Home', name: 'home', widget: 'string' }
		]},
	{
		label: 'SEO',
		name: 'seo',
		widget: 'object',
		fields: [{ label: 'Default Title', name: 'title', widget: 'string' }]
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
	media_folder: '/src/lib/assets/images/articles',
	public_folder: '/$lib/assets/images/articles',
	fields: [
		{ label: 'Language', name: 'lang', widget: 'select', options: ['en', 'it', 'pl'], default: 'en' },
		{ label: 'Title', name: 'title', widget: 'string' },
		{ label: 'Description', name: 'description', widget: 'text' },
		{ label: 'Date', name: 'date', widget: 'string' },
		{ label: 'Category', name: 'category', widget: 'string' },
		{ label: 'Featured Image', name: 'image', widget: 'image', required: false },
		{ label: 'Body', name: 'body', widget: 'markdown' }
	]
};
export const aboutCollection = {
	name: 'about',
	label: 'About (Markdown)',
	label_singular: 'About',
	folder: 'src/lib/about',
	extension: 'md',
	format: 'frontmatter',
	create: true,
	slug: '{{slug}}',
	path: '{{lang}}/{{slug}}',
	media_folder: '/src/lib/assets/images/about',
	public_folder: '/$lib/assets/images/about',
	fields: [
		{ label: 'Language', name: 'lang', widget: 'select', options: ['en', 'it', 'pl'], default: 'en' },
		{ label: 'Section Title', name: 'sectionTitle', widget: 'string' },
		{ label: 'Title', name: 'title', widget: 'string' },
		{ label: 'Subtitle', name: 'subtitle', widget: 'string', hint: 'Leave empty to disable', required: false },
		{ label: 'SEO Description', name: 'description', widget: 'string', hint: 'Populate meta description for SEO' },
		{ label: 'Portrait Image', name: 'image', widget: 'image'},
		{ label: 'Image Description', name: 'image_alt', widget: 'string', hint: 'Describe the image for people with visual impairments' },
		{ label: 'Image Quote', name: 'quote', widget: 'string', hint: 'Leave empty to disable the quote overlay over the About Me image', required: false },
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
