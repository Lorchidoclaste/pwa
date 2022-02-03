self.addEventListener('install', (e) => {
    console.log('Installation v1');
    e.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
            'favicon.ico',
            'index.html',
            'index.js',
            'icone-192x192.png',
            'icone-512x512.png',
            'images/1.jpg',
            'images/2.jpeg',
            'images/3.jpg',
            'bootstrap-5.1.3-dist/css/bootstrap.min.css',
            'icons-1.7.2/font/bootstrap-icons.css',
            'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js'
        ]);
      })
    );
  });
  
  
  self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          let responseClone = response.clone();
  
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
  
          return response;
        });
      }
    }));
  });
  
  self.addEventListener('activate', (e) => {
    console.log('fonctionne');
  });