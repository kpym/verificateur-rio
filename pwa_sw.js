// Choose a cache name
const cacheName = 'riocheck-v2';
// List the files to precache
const precacheResources = [
  '/verificateur-rio/',
  '/verificateur-rio/index.html',
  '/verificateur-rio/main.css',
  '/verificateur-rio/main.js',
  '/verificateur-rio/images/rio.svg',
  '/verificateur-rio/images/rio128.png',
  '/verificateur-rio/images/rio144.png',
  '/verificateur-rio/images/rio152.png',
  '/verificateur-rio/images/rio192.png',
  '/verificateur-rio/images/rio384.png',
  '/verificateur-rio/images/rio512.png',
  '/verificateur-rio/images/rio72.png',
  '/verificateur-rio/images/rio96.png',
  '/verificateur-rio/operateurs.js',
  '/verificateur-rio/vendor/bootstrap.min.css',
  '/verificateur-rio/vendor/vue.min.js'
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});
