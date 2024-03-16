<script lang="ts">
	import { search, filter } from '$lib';

	let star = false;
	let showAll = false;
	const toggleFilter = (filterType: string) => {
		if (filterType === 'starred') {
			star = !star;
			showAll = false;
			if (star) filter.set('starred');
			else filter.set('all');
		} else if (filterType === 'all') {
			showAll = !showAll;
			star = false;
			filter.set('all');
		}
	};

	const starred = () => {
		toggleFilter('starred');
	};

	const all = () => {
		toggleFilter('all');
	};
</script>

<section class="mb-2 h-28 sticky top-0">
	<div class="navbar bg-base-100 p-0 mt-0">
		<label
			class="input input-accent bg-[#0A0A0A] border border-[#242424] flex items-center gap-2 w-full"
		>
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
		<button class="btn btn-outline btn-accent btn-sm" on:click={all} class:active={showAll}
			>All</button
		>
		<button class="btn btn-outline btn-accent btn-sm" on:click={starred} class:active={star}
			>Starred</button
		>
	</div>
</section>

<style>
	.active {
		color: black;
		background-color: #fdf8f8;
	}
</style>
