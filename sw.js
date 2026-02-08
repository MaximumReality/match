const CACHE_NAME = 'azulos-v1.5'; // Version bump for the full folder sync
const ASSETS = [
  'index.html',
  'manifest.json',
  'favicon.png',
  'hard-cyberpunk.mp3',
  'corporate-azul.png',
  'mochkil-skate.png',
  'mochkil-living.png',
  'mochkil-burger.png',
  'smokin.png',
  'poo-rule.png',
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
      console.log('Azul-O\'s Cache: Securing the Bureaucracy...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
