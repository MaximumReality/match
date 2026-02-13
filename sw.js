const CACHE_NAME = 'azulos-v6💩'; // Version bump for the full folder sync
const ASSETS = [
  'index.html',
  'manifest.json',
  'sw.js',
  'favicon.png',
  'cardboard_tank.png',
  'poo-rule.png',
  'hard-cyberpunk.mp3',
  'corporate-azul.png',
  'mochkil-skate.png',
  'mochkil-living.png',
  'smokin.png',
  'litter-box.png',
  'azulo-bars.png',
  'og-matchmodule.png',
  'winter_azulos.png',
  'summer_azulos.png',
  'azulos_galaxy_mix.png',
  'azulos_neon_crunch.png',
  'azulo_blueberry_vanilla.jpg',
  'azulos_glitch_cereal.png',
  'mochkil_puffs_orange.png',
  'mochkil_puffs_dessert_edition.png'
];

// INSTALL: Cache assets individually, force SW to activate immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Azul-O\'s Cache: Securing assets individually...');
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset).catch(err => console.error(`Failed to cache: ${asset}`, err)))
      );
    }).then(() => self.skipWaiting()) // Immediate activation
  );
});

// ACTIVATE: Clear old caches and reload all controlled pages
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    ).then(() => {
      self.clients.claim(); // Take control of all pages immediately
      // Reload all windows to ensure they use the new SW
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => client.navigate(client.url));
      });
    })
  );
});

// FETCH: Respond with cache first, then network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
