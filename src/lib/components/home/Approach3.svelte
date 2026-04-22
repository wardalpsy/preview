<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Image1 from '$lib/assets/images/patrycja-nikki.jpg';
</script>

<section class="mx-auto max-w-5xl rounded-3xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm">
	<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
		<!-- Image Column -->
		<div class="group relative">
			<div
				class="absolute -inset-1 rounded-2xl bg-linear-to-r from-slate-200 to-stone-200 opacity-25 blur"
			></div>
			<img
				src={Image1}
				alt="Therapeutic session with Nikki"
				class="relative h-125 w-full rounded-2xl object-cover shadow-xl"
			/>
		</div>

		<!-- Content Column -->
		<div class="flex flex-col space-y-6">
			<h2 class="font-serif text-4xl tracking-tight text-slate-800">My approach</h2>

			<div class="space-y-4 text-lg leading-relaxed text-slate-600">
				<p>
					I see the therapeutic encounter as a journey—sometimes a bumpy one, but always shared. My
					role in this journey is to be there with you, helping you discover and strengthen your
					resources.
				</p>
				<p>
					I believe that you already have the resources necessary to overcome your difficulties,
					even if you might not be aware of them yet.
				</p>
				<p class="border-l-4 border-slate-300 pl-4 font-semibold text-slate-900 italic">
					Together, we will change that.
				</p>
				<p>
					My clinical practice is based on the Ericksonian approach and hypnosis. In the therapy
					room, you may also meet my co-therapist Nikki, a dog who intervenes when needed.
				</p>
			</div>

			<div class="pt-4">
				<p class="mb-3 font-medium text-slate-800">I mainly work with:</p>
				<div class="mb-8 flex flex-wrap gap-2">
					<span
						class="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm"
					>
						Adolescents
					</span>
				</div>

				<!-- Dialog Buttons -->
				<div class="flex flex-col gap-4 sm:flex-row">
					<Dialog.Root>
						<Dialog.Trigger>Ericsonian psychotherapy</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Ericsonian psychotherapy</Dialog.Title>
								<Dialog.Description
									>Detailed information about the Ericksonian method.</Dialog.Description
								>
							</Dialog.Header>
						</Dialog.Content>
					</Dialog.Root>

					<Dialog.Root>
						<Dialog.Trigger>Hypnosis</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Hypnosis</Dialog.Title>
								<Dialog.Description>Details about clinical hypnosis sessions.</Dialog.Description>
							</Dialog.Header>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
		</div>
	</div>
</section>
