const CACHE_NAME = 'azulos-v6'; // Version bump for the full folder sync
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
  'azulo-bars.png', // Added from folder list
  'og-matchmodule.png',       // Added from folder list
  'winter_azulos.png',
  'summer_azulos.png',
  'azulos_galaxy_mix.png',
  'azulos_neon_crunch.png',
  'azulo_blueberry_vanilla.jpg',
  'azulos_glitch_cereal.png',
  'mochkil_puffs_orange.png',
  'mochkil_puffs_dessert_edition.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Azul-O\'s Cache: Securing assets individually...');
      // Map through each asset and add it one by one to prevent total failure
      return Promise.allSettled(
        ASSETS.map(asset => {
          return cache.add(asset).catch(err => console.error(`Failed to secure: ${asset}`, err));
        })
      );
    })
  );
  self.skipWaiting(); // Forces the SW to activate immediately
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old reality:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

