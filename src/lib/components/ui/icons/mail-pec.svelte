<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let { ...props }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	version="1.1"
	id="svg4"
	xmlns="http://www.w3.org/2000/svg"
	{...props}
>
	<defs id="defs4" />
	<path stroke="none" d="M0 0h24v24H0z" fill="none" id="path1" />
	<path d="M11 19h-6a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" id="path2" />
	<path d="M3 7l9 6l9 -6" id="path3" />
	<path
		d="m 20.720001,16.463333 c 0,3.577779 -2.232144,5.366668 -3.125001,5.366668 -0.892857,0 -3.125001,-1.788889 -3.125001,-5.366668 0.892857,0 2.232144,-0.447222 3.125001,-1.341667 0.892857,0.894445 2.232144,1.341667 3.125001,1.341667"
		id="path4-6"
		style="stroke-width:2"
	/>
</svg>
