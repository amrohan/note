<script lang="ts">
	import { db } from '$lib/db';
	import { importDB, exportDB } from 'dexie-export-import';
	import { toast } from 'svoast';

	async function exportDatabse() {
		const blob = (await exportDB(db).catch(() => false)) as Blob;
		if (!blob) {
			toast.error('Failed to export database');
			return;
		}
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'my-database.db';
		a.click();
		URL.revokeObjectURL(url);
		toast.success('Database exported successfully');
	}

	async function importDatabase() {
		const fileInput = document.querySelector('.file-input') as HTMLInputElement;
		const file = fileInput.files ? fileInput.files[0] : null;
		if (!file) return;
		const blob = new Blob([file], { type: 'application/octet-stream' });
		await db.delete();
		await importDB(blob);
		toast.success('Database imported successfully');
	}
</script>

<div>
	<h1 class="mb-2 mt-2">Settings</h1>

	<div class="flex flex-col w-full lg:flex-row mt-10">
		<div
			class="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center place-content-center gap-2"
		>
			<h3 class="m-0">Import your existing data</h3>
			<input type="file" class="file-input file-input-bordered w-full max-w-xs" />
			<small class="text-gray-500">Select a .db file to import</small>
			<button on:click={importDatabase} class="btn btn-primary btn-sm">Import</button>
		</div>
		<div class="divider lg:divider-horizontal">OR</div>
		<div
			class="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center place-content-center gap-2"
		>
			<h3 class="m-0">Export you data</h3>
			<button on:click={exportDatabse} class="btn btn-primary btn-sm">Export</button>
		</div>
	</div>
</div>
