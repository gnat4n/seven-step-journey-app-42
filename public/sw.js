
const CACHE_NAME = '7steps-app-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/8802b8ff-8b05-41f8-82cd-7ef9c9355371.png'
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

// Estratégia de cache: Stale-While-Revalidate 
// Usa a versão em cache primeiro, depois atualiza em segundo plano
self.addEventListener('fetch', event => {
  // Não intercepta requisições de navegação ou API
  if (event.request.mode === 'navigate' || 
      event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Atualiza o cache se for uma resposta válida
            if (networkResponse && networkResponse.status === 200 && 
                networkResponse.type === 'basic') {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Falhou em buscar, tenta retornar resposta em cache
            return cachedResponse;
          });
        
        // Retorna a versão em cache primeiro (se existir)
        return cachedResponse || fetchPromise;
      });
    })
  );
});

// Gerencia mensagens do cliente (útil para forçar atualização)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
