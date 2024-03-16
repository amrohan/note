/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(version).then((cache) => {
			cache.addAll(build.concat(files));
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== version) await caches.delete(key);
			}
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});

self.addEventListener('message', (event) => {
	if (event.data === 'skipWaiting') {
		self.skipWaiting();
	}
});

// Path: src/routes/index.svelte
