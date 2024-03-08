<script>
	import { page } from '$app/stores';
	import '../app.css';
	import BottomNav from '../components/BottomNav.svelte';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="prose prose-zinc container max-w-5xl mx-auto">
	{#if !$page.route.id?.match('add|edit')}
		<Navbar />
		<BottomNav />
	{/if}
	<slot />
</div>
