
const CACHE_NAME = '7steps-app-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/8802b8ff-8b05-41f8-82cd-7ef9c9355371.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/maskable_icon.png',
  '/icons/maskable_icon_512.png'
];

// Instala o service worker e cria cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Força a ativação imediata
  self.skipWaiting();
});

// Quando o serviço é ativado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Remove caches antigas
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Toma controle imediato sem refresh
      return self.clients.claim();
    })
  );
});

// Estratégia de cache: Network First com fallback para cache
// Prioriza dados atualizados, mas funciona offline
self.addEventListener('fetch', event => {
  // Não intercepta requisições de navegação ou API
  if (event.request.mode === 'navigate' || 
      event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a resposta for válida, atualiza o cache
        if (response && response.status === 200 && 
            response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Se falhar, tenta retornar do cache
        return caches.match(event.request);
      })
  );
});

// Gerencia mensagens do cliente (útil para forçar atualização)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Evento para lidar com notificações push
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/'
      }
    };

    event.waitUntil(
      self.registration.showNotification('7Steps', options)
    );
  }
});

// Lidar com cliques em notificações
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Ativar o modo de tela cheia para uma experiência mais nativa
self.addEventListener('fetch', event => {
  if (event.request.url.includes('manifest.json')) {
    event.respondWith(
      fetch(event.request).then(response => {
        return response;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});
