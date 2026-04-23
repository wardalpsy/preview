// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}

	interface Window {
		Cal: any;
	}
	var Cal: any;
}

declare module 'virtual:cms-icons' {
	import type { Component } from 'svelte';
	export const icons: Record<string, Component>;
	export function getIcon(name: string): Component | null;
}

export {};
