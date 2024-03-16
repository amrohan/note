/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	async function preCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
	async function clearOldCache() {
		const keys = await caches.keys();
		await Promise.all(
			keys.map((key) => {
				if (key !== CACHE) {
					return caches.delete(key);
				}
			})
		);
	}

	event.waitUntil(clearOldCache());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	/**
	 * Handles the response logic for the service worker.
	 * @returns {Promise<Response>} The response to be sent back to the client.
	 */
	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);
			if (response) return response;
		}

		try {
			const response = await fetch(event.request);
			const isNotExtension = url.protocol.startsWith('http') && !url.pathname.includes('.');
			const isSuccessful = response.status === 200 || response.status === 0;
			if (isNotExtension && isSuccessful) {
				cache.put(event.request, response.clone());
			}
			return response;
		} catch (error) {
			//fallback to cache
			const cachedResponse = await cache.match(url.pathname);
			if (cachedResponse) return cachedResponse;
		}
		return new Response(null, { status: 404 });
	}
	event.respondWith(respond());
});

self.addEventListener('message', (event) => {
	if (event.data === 'skipWaiting') {
		self.skipWaiting();
	}
});
