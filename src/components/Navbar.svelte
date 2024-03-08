<script lang="ts">
	import { search } from '$lib/searchStore';
</script>

<section class="mb-2 h-40 sticky top-0 bg-base-100">
	<div class="flex justify-between items-center">
		<h1 class="mb-2 mt-2">Notes</h1>
		<a href="/add" class="btn btn-sm btn-square btn-outline">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-5"><path d="M5 12h14" /><path d="M12 5v14" /></svg
			>
		</a>
	</div>
	<div class="navbar bg-base-100 p-0 mt-0">
		<label class="input input-accent bg-zinc-800 border-0 flex items-center gap-2 w-full">
			<input type="text" id="search" class="grow" placeholder="Search" bind:value={$search} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-4 h-4 opacity-70"
				><path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd"
				/></svg
			>
		</label>
	</div>
	<!-- Chips -->
	<div class="flex justify-start items-center gap-3">
		<button class="btn btn-outline btn-accent btn-sm">All</button>
		<button class="btn btn-outline btn-accent btn-sm">Starred</button>
	</div>
</section>
