<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import faviconIco from '$lib/assets/favicon.ico';
	let {
		title = 'Dr. Patrycja Wardal | Psychologist, Psychotherapist, Hypnotherapist',
		metaDesc = 'Personalized psychological support and psychotherapy. Specialized in Cognitive Behavioral Therapy (CBT).',
		siteName = 'Patrycja Wardal Psychotherapy',
		url = 'https://wardalpsy.com',
		image = '/seo-image.png',
		lang = 'en',
		// Practice specific info
		address = {
			street: 'Placeholder Street 123',
			city: 'City Name',
			zip: '00-000',
			country: 'PL'
		},
		phone = '+48 000 000 000',
		email = 'contact@wardalpsy.com'
	} = $props();

	// Schema Logic using Schema.org MedicalBusiness / Physician
	let schema = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Physician', // Used for medical/mental health professionals
				'@id': `${url}/#identity`,
				name: 'Patrycja Wardal',
				image: `${url}${image}`,
				description: metaDesc,
				telephone: phone,
				email: email,
				url: url,
				address: {
					'@type': 'PostalAddress',
					streetAddress: address.street,
					addressLocality: address.city,
					postalCode: address.zip,
					addressCountry: address.country
				},
				knowsLanguage: ['English', 'Italian', 'Polish'],
				medicalSpecialty: 'Psychology',
				availableService: [
					{
						'@type': 'MedicalTherapy',
						name: 'Cognitive Behavioral Therapy',
						description:
							'Evidence-based psychotherapy for anxiety, depression, and personal growth.'
					}
				]
			},
			{
				'@type': 'WebSite',
				'@id': `${url}/#website`,
				url: url,
				name: siteName,
				publisher: { '@id': `${url}/#identity` },
				inLanguage: lang
			},
			{
				'@type': 'WebPage',
				'@id': `${url}/#webpage`,
				isPartOf: { '@id': `${url}/#website` },
				name: title,
				description: metaDesc,
				url: url,
				inLanguage: lang
			}
		]
	});

	// Use ('<' + '/script>') to prevent the "Unnecessary escape character" error
	let jsonLd = $derived(
		`<script type="application/ld+json">${JSON.stringify(schema)}` + '<' + '/script>'
	);
</script>

<svelte:head>
	<!-- Standard Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={metaDesc} />
	<link rel="canonical" href={url} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={metaDesc} />
	<meta property="og:image" content={`${url}${image}`} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={metaDesc} />
	<meta name="twitter:image" content={`${url}${image}`} />
	<link rel="icon" href={favicon} />
	<link rel="shortcut icon" href={faviconIco} />
	<!-- JSON-LD Injector -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLd}
</svelte:head>
