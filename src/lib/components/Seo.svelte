<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import faviconIco from '$lib/assets/favicon.ico';
	import { i18n } from '$lib/i18n.svelte';

	let {
		title = i18n.t.seo.title,
		metaDesc = 'Personalized psychological support and psychotherapy. Specialized in Ericksonian psychotherapy and Hypnosis.',
		siteName = 'Dr Patrycja Wardal - Psychologist',
		url = 'https://wardalpsy.com',
		image = '/seo-image.png',
		lang = i18n.currentLang,
		// Practice specific info
		address = {
			street: 'Bari, Italy',
			city: 'Bari',
			zip: '70124',
			country: 'IT'
		},
		phone = i18n.t.footer.phone,
		email = i18n.t.footer.email,
		sameAs = [
			i18n.t.footer.linkedin,
			i18n.t.footer.instagram,
			i18n.t.footer.facebook,
			i18n.t.footer.twitter
		].filter(Boolean)
	} = $props();

	// Schema Logic using Schema.org Psychologist
	let schema = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Psychologist',
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
				geo: {
					'@type': 'GeoCoordinates',
					latitude: '41.1171', // Bari coordinates
					longitude: '16.8719'
				},
				knowsLanguage: ['English', 'Italian', 'Polish'],
				medicalSpecialty: 'Psychology',
				priceRange: '€€',
				openingHours: 'Mo,Tu,We,Th,Fr 09:00-19:00',
				sameAs: sameAs,
				availableService: [
					{
						'@type': 'MedicalTherapy',
						name: 'Psychotherapy',
						description: 'Individual and group psychotherapy sessions.'
					},
					{
						'@type': 'MedicalTherapy',
						name: 'Hypnosis',
						description: 'Clinical hypnosis for various psychological issues.'
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
