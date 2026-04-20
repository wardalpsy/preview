<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		'flex size-(--cell-size) flex-col items-center justify-center gap-1 rounded-(--cell-radius) p-0 leading-none font-normal whitespace-nowrap select-none',
		'cursor-pointer [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)',
		'not-data-selected:hover:bg-secondary not-data-selected:hover:text-on-secondary',
		'[&[data-today]:not([data-selected])]:bg-primary-container/30 [&[data-today]:not([data-selected])]:text-on-primary-container [&[data-today][data-disabled]]:text-muted-foreground',
		'data-selected:bg-primary data-selected:text-on-primary data-selected:hover:bg-brand',
		// Outside months
		'[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground',
		// Disabled
		'data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50',
		// Unavailable
		'data-unavailable:text-muted-foreground data-unavailable:line-through',
		// focus
		'focus:relative focus:border-ring focus:ring-ring/50',
		// inner spans
		'[&>span]:text-xs [&>span]:opacity-70',
		className
	)}
	{...restProps}
/>
