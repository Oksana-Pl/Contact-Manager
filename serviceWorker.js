self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('contacts-manager-cache').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './styles.css',
                './manifest.json',
                './script.js',
                './icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
 