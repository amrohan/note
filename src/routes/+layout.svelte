<script>
	import { page } from '$app/stores';
	import '../app.css';
	import BottomNav from '../components/BottomNav.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { Toasts } from 'svoast';
</script>

<div class="prose prose-zinc container max-w-5xl mx-auto">
	<Toasts position="top-right" />
	{#if !$page.route.id?.match('add|edit')}
		{#if !$page.route.id?.match('settings')}
			<Navbar />
		{/if}
		<BottomNav />
	{/if}
	<slot />
</div>
