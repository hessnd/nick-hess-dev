self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('hesstopher-v1').then(cache => {
      return cache.addAll([
        '/js/**.*',
        '/fonts/**.*',
        '/styles.css',
      ]);
    })
  );
});
