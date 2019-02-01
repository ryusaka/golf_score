const STATIC_DATA = [
  '/?pwa=true',
  'index.html',
  'bundle.js',
  'manifest.json',
  'icons/icon-72x72.png',
  'icons/icon-96x96.png',
  'icons/icon-128x128.png',
  'icons/icon-144x144.png',
  'icons/icon-152x152.png',
  'icons/icon-192x192.png',
  'icons/icon-384x384.png',
  'icons/icon-512x512.png',
  'splashes/launch-1242x2688.png',
  'splashes/launch-828x1792.png',
  'splashes/launch-1125x2436.png',
  'splashes/launch-1242x2208.png',
  'splashes/launch-750x1334.png',
  'splashes/launch-640x1136.png',
  'serviceWorker.js',
]

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open('cache_v1').then(function(cache) {
      return cache.addAll(STATIC_DATA)
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate')
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  )
})
