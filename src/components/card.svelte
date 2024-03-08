<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '../lib/db';
	import { search } from '$lib';

	$: notes = liveQuery(async () => {
		const searchTerm = $search;
		if (!searchTerm) {
			// If the search term is empty, return all notes
			// return await db.notes.where('isDeleted').equals(0).toArray();
			return await db.notes.filter((note) => note.isDeleted === false).toArray();
		} else {
			return await db.notes
				.filter(
					(note) =>
						note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
						note.content.toLowerCase().includes(searchTerm.toLowerCase())
				)
				.filter((note) => note.isDeleted === false)
				.toArray();
		}
	});

	async function updateStar(noteId: number, value: boolean) {
		await db.notes.update(noteId, { star: value });
	}
</script>

<!-- Card contents -->
<div class="mb-20">
	{#if $notes}
		{#each $notes as note (note.id)}
			<!-- pass value of id like edit/id -->
			<div class="h-16 rounded-lg mb-1 bg-zinc-900 p-2 flex justify-between items-start">
				<a
					href="edit/{note.id}"
					class="no-underline flex flex-col justify-center items-start h-14 w-10/12"
				>
					<h4 class="m-0">{note.title}</h4>
					<p class="text-accent font-semibold mt-0 text-xs">{note.date}</p>
				</a>

				<div class="grid place-content-center h-12 w-2/12 z-40">
					<button
						class="btn btn-square bg-transparent border-0"
						on:click={() => {
							if (note.id !== undefined) {
								updateStar(note.id, !note.star);
							}
						}}
					>
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
							class="size-5 fill-current"
							class:starred={note.star}
							><polygon
								points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
							/></svg
						>
					</button>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.starred {
		color: rgb(234 179 8 / 100%);
	}
</style>
