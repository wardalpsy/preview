declare module 'virtual:cms-icons' {
	import type { Component } from 'svelte';
	export const icons: Record<string, Component>;
	export function getIcon(name: string): Component | null;
}
