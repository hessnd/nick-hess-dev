self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('hesstopher-v1').then(cache => {
      return cache.addAll([
        '*.{html,woff,woff2,ttf}',
        'main.1f19ae8e.js',
        'main.1f19ae8e.css',
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => {
        console.log(cacheName);
        return true;
      }).map(cacheName => caches.delete(cacheName))
    ))
  );
});
