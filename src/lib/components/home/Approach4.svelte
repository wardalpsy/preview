<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Image2 from '$lib/assets/images/patrycja-nikki-2.jpg';
	import Image1 from '$lib/assets/images/patrycja-nikki.jpg';
</script>

<section class="mx-auto max-w-6xl bg-background p-8">
	<div class="mx-auto mb-12 max-w-3xl text-center">
		<h2 class="mb-8 font-serif text-5xl text-slate-900">My approach</h2>
		<div class="space-y-6 text-xl leading-relaxed text-slate-600">
			<p>
				I see the therapeutic encounter as a journey—sometimes a bumpy one, but always shared. My
				role in this journey is to be there with you, helping you discover and strengthen your
				resources.
			</p>
			<p>
				I believe that you already have the resources necessary to overcome your difficulties, even
				if you might not be aware of them yet.
				<span class="mt-2 block font-bold text-slate-900">Together, we will change that.</span>
			</p>
		</div>
	</div>

	<!-- Two Image Grid -->
	<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
		<img
			src={Image1}
			alt="Session 1"
			class="h-100 w-full rounded-3xl object-cover shadow-md transition-transform duration-300 hover:scale-[1.01]"
		/>
		<img
			src={Image2}
			alt="Session 2"
			class="h-100 w-full rounded-3xl object-cover shadow-md transition-transform duration-300 hover:scale-[1.01]"
		/>
	</div>

	<div
		class="flex flex-col items-center justify-between gap-8 rounded-3xl bg-slate-50 p-8 md:flex-row"
	>
		<div class="max-w-md">
			<p class="text-slate-700 italic">
				"In the therapy room, you may also meet my co-therapist Nikki, a dog who intervenes when
				needed."
			</p>
			<div class="mt-4 flex gap-4 text-sm font-medium tracking-widest text-slate-500 uppercase">
				<span>Adolescents</span> • <span>Young adults</span> • <span>Adults</span>
			</div>
		</div>

		<!-- Dialog Buttons -->
		<div class="flex gap-4">
			<Dialog.Root>
				<Dialog.Trigger>
					<Button class="rounded-full bg-stone-800 px-6 shadow-lg">Ericsonian psychotherapy</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header><Dialog.Title>Ericsonian psychotherapy</Dialog.Title></Dialog.Header>
				</Dialog.Content>
			</Dialog.Root>

			<Dialog.Root>
				<Dialog.Trigger>Hypnosis</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header><Dialog.Title>Hypnosis</Dialog.Title></Dialog.Header>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
</section>
