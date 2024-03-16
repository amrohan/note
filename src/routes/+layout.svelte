<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.css';
	import BottomNav from '../components/BottomNav.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { Toasts, toast } from 'svoast';

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;
		registration.addEventListener('updatefound', () => {
			const newWorker = registration.installing;
			if (!newWorker) {
				return;
			}
			newWorker.addEventListener('statechange', () => {
				if (newWorker.state === 'installed') {
					if (navigator.serviceWorker.controller) {
						toast.info('New content is available; please refresh.');
						if (confirm('New content is available; please refresh.')) {
							newWorker.postMessage({ action: 'skipWaiting' });
							window.location.reload();
						}
					} else {
						toast.info('Content is cached for offline use.');
					}
				}
			});
		});
	}

	onMount(() => {
		if ('serviceWorker' in navigator) {
			detectSWUpdate();
		}
	});
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
