const CACHE_NAME = 'azulos-v1.3'; // Bumped version to force iPhone to refresh
const ASSETS = [
  'index.html',
  'manifest.json',
  'favicon.png',          // Added for the Home Screen icon
  'corporate-azul.png',   // Added for the Splash Screen
  'mochkil-skate.png',    // Added for the Splash Screen
  'mochkil-living.png',   // Added for the Splash Screen
  'hard-cyberpunk.mp3',
  'litter-box.png',
  'smokin.png',
  'mochkil-burger.png',
  'winter_azulos.png',
  'azulos_galaxy_mix.png',
  'azulos_neon_crunch.png',
  'azulo_blueberry_vanilla.jpg',
  'azulos_glitch_cereal.png',
  'summer_azulos.png',
  'mochkil_puffs_orange.png',
  'mochkil_puffs_dessert_edition.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
