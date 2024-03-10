<script lang="ts">
	import { page } from '$app/stores';
	import { db, type Note } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { toast } from 'svoast';

	$: pa = $page.params.id;

	$: notes = liveQuery(async () => {
		const nootebook = await db.notes.where('id').equals(+pa).toArray();
		return nootebook;
	});

	async function updateNote(item: Note) {
		const updated = await db.notes.update(item.id!, item).catch((e) => {
			return false;
		});

		if (!updated) {
			toast.error('Error updating note', { closable: true });
			console.error('Note not found or update failed');
		}
	}

	async function updateStar(value: boolean) {
		await db.notes.update(+pa, { star: value });
	}

	async function deleteNote() {
		await db.notes.update(+pa, { isDeleted: true });
	}
</script>

{#if $notes}
	{#each $notes as note (note.id)}
		<section class="overflow-x-hidden animate-fade-left animate-duration-500 animate-ease-in-out">
			<!-- Header -->
			<div class="flex justify-between items-center mt-2">
				<!-- Back Icon -->
				<a href="/">
					<div class="btn btn-sm btn-square bg-zinc-800 m-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24"
							class="size-5 fill-current dark:text-zinc-200"
						>
							<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
						</svg>
					</div>
				</a>

				<div class="flex justify-end items-center gap-1">
					<button
						class="btn btn-square bg-transparent border-0"
						on:click={() => {
							updateStar(!note.star);
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
					<!-- Menu -->
					<div class="dropdown dropdown-end">
						<div tabindex="0" role="button" class="btn btn-sm btn-square bg-zinc-800 m-1">
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
								class="size-5"
								><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
									cx="5"
									cy="12"
									r="1"
								/></svg
							>
						</div>
						<ul class="dropdown-content z-[1] menu p-2 shadow bg-zinc-800 rounded-box w-28">
							<button
								class="btn btn-secondary btn-sm mb-2"
								on:click={() => {
									note.archived = !note.archived;
									updateNote(note);
								}}
							>
								Archive
							</button>
							<button
								class="btn btn-error btn-sm"
								on:click={() => {
									deleteNote();
								}}>Delete</button
							>
						</ul>
					</div>
				</div>
			</div>
			<!-- Transaction Form content -->
			<main class="h-full p-2 mx-auto w-full">
				<!-- Title -->
				<div class="mt-2">
					<input
						bind:value={note.title}
						on:input={() => {
							updateNote(note);
						}}
						tabindex="0"
						type="text"
						name="title"
						placeholder="Untitled"
						class="bg-transparent w-full border-0 text-3xl border-zinc-800 focus:outline-none placeholder:text-3xl placeholder:dark:text-zinc-600 placeholder:dark:font-bold"
					/>
				</div>
			</main>
			<textarea
				class="w-full max-h-svh min-h-svh p-2 bg-transparent border-0 border-zinc-800 focus:outline-none placeholder-zinc-900 placeholder:text-zinc-600"
				placeholder="Start typing..."
				bind:value={note.content}
				on:input={() => {
					updateNote(note);
				}}
			></textarea>
			<!-- Editor like notion https://konstantin.digital/blog/how-to-build-a-text-editor-like-notion -->
		</section>
	{/each}
{/if}

<style>
	.starred {
		color: rgb(234 179 8 / 100%);
	}
</style>
