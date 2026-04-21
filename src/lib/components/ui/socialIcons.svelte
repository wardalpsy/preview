<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { i18n } from '$lib/i18n.svelte';
	//Icons
	import IconMail from 'virtual:icons/tabler/mail';
	import IconBrandFacebook from 'virtual:icons/tabler/brand-facebook';
	import IconBrandWhatsapp from 'virtual:icons/tabler/brand-whatsapp';
	import IconBrandLinkedin from 'virtual:icons/tabler/brand-linkedin';
	import IconBrandInstagram from 'virtual:icons/tabler/brand-instagram';
	import IconBrandX from 'virtual:icons/tabler/brand-x';
	import IconPhone from 'virtual:icons/tabler/phone';
	import IconMailPec from '$lib/components/ui/icons/mail-pec.svelte';

	// URL Helper
	const formatUrl = (id: string, value: string) => {
		if (id === 'email') return `mailto:${value}`;
		if (id === 'pec_email') return `mailto:${value}`;
		if (id === 'phone') return `tel:+${value}`;
		if (id === 'whatsapp') {
			// Removes spaces, dashes, and the '+' sign for the wa.me API
			const cleanNumber = value.replace(/\D/g, '');
			return `https://wa.me/${cleanNumber}`;
		}
		return value;
	};
	// Array for Contact options
	const socialLinks = $derived([
		{ id: 'email', label: 'E-mail', href: i18n.t.footer.email, icon: IconMail },
		{ id: 'pec_email', label: 'PEC email', href: i18n.t.footer.pec_email, icon: IconMailPec },
		{ id: 'phone', label: 'Phone', href: i18n.t.footer.phone, icon: IconPhone },
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

<ul class="flex flex-wrap items-center gap-4 text-sm text-foreground">
	{#each socialLinks as link (link.id)}
		{#if link.href}
			<li class="flex items-center">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<a
							href={formatUrl(link.id, link.href)}
							class="footer-contact_link"
							aria-label={link.id === 'email'
								? link.label
								: `${link.label} ${i18n.t.footer.external_link}`}
							target={link.id === 'email' ? undefined : '_blank'}
							rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
						>
							<link.icon class="size-5" aria-hidden="true" />
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="bottom">
						<p>{link.label}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</li>
		{/if}
	{/each}
</ul>
