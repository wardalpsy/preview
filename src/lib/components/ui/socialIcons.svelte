<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	//Icons
	import IconMail from 'virtual:icons/tabler/mail';
	import IconBrandFacebook from 'virtual:icons/tabler/brand-facebook';
	import IconBrandWhatsapp from 'virtual:icons/tabler/brand-whatsapp';
	import IconBrandLinkedin from 'virtual:icons/tabler/brand-linkedin';
	import IconBrandInstagram from 'virtual:icons/tabler/brand-instagram';
	import IconBrandX from 'virtual:icons/tabler/brand-x';
	import IconPhone from 'virtual:icons/tabler/phone';
	import IconLocation from 'virtual:icons/tabler/map-pin';
	import IconMailPec from '$lib/components/ui/icons/mail-pec.svelte';

	// URL Helper
	const formatUrl = (id: string, value: string) => {
		if (id === 'whatsapp') {
			// Removes spaces, dashes, and the '+' sign for the wa.me API
			const cleanNumber = value.replace(/\D/g, '');
			return `https://wa.me/${cleanNumber}`;
		}
		return value;
	};
	// Array for Contact options
	const socialLinks = $derived([
		{ id: 'whatsapp', label: 'WhatsApp', href: i18n.t.footer.whatsapp, icon: IconBrandWhatsapp },
		{ id: 'linkedin', label: 'LinkedIn', href: i18n.t.footer.linkedin, icon: IconBrandLinkedin },
		{ id: 'twitter', label: 'X (Twitter)', href: i18n.t.footer.twitter, icon: IconBrandX },
		{
			id: 'instagram',
			label: 'Instagram',
			href: i18n.t.footer.instagram,
			icon: IconBrandInstagram
		},
		{ id: 'facebook', label: 'Facebook', href: i18n.t.footer.facebook, icon: IconBrandFacebook }
	]);
</script>

<ul class="mb-6 space-y-1.5">
	<li class="flex items-center gap-2">
		<IconPhone class="size-5 text-brand" aria-hidden="true" />
		<a href="tel:{i18n.t.footer.phone}" class="text-sm text-foreground/90"
			><span class="sr-only">{i18n.t.footer.phone_aria}</span>{i18n.t.footer.phone_formatted}</a
		>
	</li>
	<li class="flex items-center gap-2">
		<IconMail class="size-5 text-brand" aria-hidden="true" />
		<a href="mailto:i18n.t.footer.email" class="text-sm text-foreground/90">{i18n.t.footer.email}</a
		>
	</li>
	<li class="flex items-center gap-2">
		<IconMailPec class="size-5 text-brand" aria-hidden="true" />
		<a href="mailto:{i18n.t.footer.pec_email}" class="text-sm text-foreground/90"
			>{i18n.t.footer.pec_email}</a
		>
	</li>
</ul>
<div class="mb-6 flex flex-col gap-1.5 text-sm text-foreground/90">
	<div class="flex items-center gap-1.5">
		<IconLocation class="size-5 text-brand" aria-hidden="true" />
		{i18n.t.footer.location}
	</div>
	<p class="ml-6.5 whitespace-pre-line">{i18n.t.footer.location_info}</p>
</div>
<ul class="flex flex-wrap items-center gap-4 text-sm text-foreground">
	{#each socialLinks as link (link.id)}
		{#if link.href}
			<li class="flex items-center">
				<a
					href={formatUrl(link.id, link.href)}
					class="footer-contact_link"
					aria-label={link.id === 'email'
						? link.label
						: `${link.label} ${i18n.t.a11y.external_link}`}
					target={link.id === 'email' ? undefined : '_blank'}
					rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
				>
					<link.icon class="size-5" aria-hidden="true" />
				</a>
			</li>
		{/if}
	{/each}
</ul>
