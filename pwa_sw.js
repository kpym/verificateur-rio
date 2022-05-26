// Choose a cache name
const cacheName = 'riocheck-v1';
// List the files to precache
const precacheResources = [
  '/',
  'index.html',
  'main.css',
  'main.js',
  'images/rio.svg',
  'images/rio128.png',
  'images/rio144.png',
  'images/rio152.png',
  'images/rio192.png',
  'images/rio384.png',
  'images/rio512.png',
  'images/rio72.png',
  'images/rio96.png',
  'operateurs.js',
  'vendor/bootstrap.min.css',
  'vendor/vue.min.js'
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
