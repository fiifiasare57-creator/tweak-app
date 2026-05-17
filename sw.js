const CACHE_NAME = 'tweaks-v1';
const urlsToCache = ['/', '/index.html', '/login.html', '/profile.html', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(response => response || new Response('Offline')))
  );
});
