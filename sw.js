// ===== Pitch Anything — Service Worker =====
const CACHE_NAME = 'pitch-anything-v1';

// Files to cache for offline use
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './manifest.json',
    './icons/icon-72.svg',
    './icons/icon-96.svg',
    './icons/icon-128.svg',
    './icons/icon-144.svg',
    './icons/icon-152.svg',
    './icons/icon-192.svg',
    './icons/icon-384.svg',
    './icons/icon-512.svg',
];

// External CDN resources — cache when first fetched
const CDN_URLS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
];

// ===== INSTALL — cache all core assets =====
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching core assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// ===== ACTIVATE — clean old caches =====
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    })
            )
        )
    );
    self.clients.claim();
});

// ===== FETCH — serve from cache, fall back to network =====
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request)
                .then((networkResponse) => {
                    // Cache CDN resources and valid responses
                    if (
                        networkResponse &&
                        networkResponse.status === 200 &&
                        (request.url.startsWith('http') )
                    ) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Offline fallback — return index for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
        })
    );
});

console.log('[SW] Service Worker loaded.');
