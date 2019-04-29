// Hold the service worker in the installing phase while we build our cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pwa-calc').then(function(cache) {
      return cache.addAll(['/', 'index.html', '/base.css'])
    })
  )
})

// Serve requests from our cache if possible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request)
    })
  )
})